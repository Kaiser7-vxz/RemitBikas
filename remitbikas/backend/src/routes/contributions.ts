import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { asyncHandler, authenticateToken } from '../middleware/index.js';
import { AuthRequest, ApiResponse } from '../types/index.js';

const router = Router();
const prisma = new PrismaClient();

// CREATE CONTRIBUTION
router.post(
  '/',
  authenticateToken,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const { projectId, amount, paymentMethod, description } = req.body;

    if (!projectId || !amount || !paymentMethod) {
      res.status(400).json({
        success: false,
        message: 'Missing required fields',
      } as ApiResponse<null>);
      return;
    }

    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      res.status(404).json({
        success: false,
        message: 'Project not found',
      } as ApiResponse<null>);
      return;
    }

    const VALID_PAYMENT_METHODS = ['BANK_TRANSFER', 'MOBILE_WALLET', 'CREDIT_CARD', 'CASH'];
    // Normalize gateway names to valid enum values
    let normalizedMethod = paymentMethod?.toUpperCase() || 'MOBILE_WALLET';
    if (!VALID_PAYMENT_METHODS.includes(normalizedMethod)) {
      normalizedMethod = 'MOBILE_WALLET'; // eSewa, Khalti, etc. → MOBILE_WALLET
    }

    const contribution = await prisma.contribution.create({
      data: {
        projectId,
        userId: req.user!.id,
        amount: parseFloat(amount),
        paymentMethod: normalizedMethod as any,
        description,
        status: 'PENDING',
        transactionId: `TXN-${Date.now()}`,
      },
      include: {
        project: { select: { title: true } },
        user: { select: { name: true, email: true } },
      },
    });

    // We do NOT update the project funding collected here anymore.
    // It will be updated upon successful payment verification.

    res.status(201).json({
      success: true,
      message: 'Contribution created successfully',
      data: contribution,
    } as ApiResponse<any>);
  })
);

// GET USER CONTRIBUTIONS
router.get(
  '/user/my-contributions',
  authenticateToken,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const contributions = await prisma.contribution.findMany({
      where: { userId: req.user?.id },
      include: {
        project: {
          select: { id: true, title: true, status: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    const stats = {
      totalContributed: contributions.reduce((sum: number, c: any) => sum + c.amount, 0),
      contributionCount: contributions.length,
      projectsContributed: new Set(contributions.map((c: any) => c.projectId)).size,
      averageContribution:
        contributions.length > 0
          ? contributions.reduce((sum: number, c: any) => sum + c.amount, 0) / contributions.length
          : 0,
    };

    res.json({
      success: true,
      message: 'Contributions retrieved successfully',
      data: { contributions, stats },
    } as ApiResponse<any>);
  })
);

// GET PROJECT CONTRIBUTIONS
router.get(
  '/project/:projectId',
  asyncHandler(async (req: Request, res: Response) => {
    const contributions = await prisma.contribution.findMany({
      where: { projectId: req.params.projectId },
      include: {
        user: {
          select: { name: true, avatar: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    const stats = {
      total: contributions.length,
      totalAmount: contributions.reduce((sum: number, c: any) => sum + c.amount, 0),
      byStatus: {
        completed: contributions.filter((c: any) => c.status === 'COMPLETED').length,
        pending: contributions.filter((c: any) => c.status === 'PENDING').length,
        failed: contributions.filter((c: any) => c.status === 'FAILED').length,
      },
    };

    res.json({
      success: true,
      message: 'Project contributions retrieved successfully',
      data: { contributions, stats },
    } as ApiResponse<any>);
  })
);

// UPDATE CONTRIBUTION STATUS (Admin only)
router.put(
  '/:id/status',
  authenticateToken,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    if (req.user?.role !== 'ADMIN') {
      res.status(403).json({
        success: false,
        message: 'Only admins can update contribution status',
      } as ApiResponse<null>);
      return;
    }

    const { status } = req.body;

    if (!status) {
      res.status(400).json({
        success: false,
        message: 'Status is required',
      } as ApiResponse<null>);
      return;
    }

    const contribution = await prisma.contribution.update({
      where: { id: req.params.id },
      data: { status },
    });

    // Send notification to user
    await prisma.notification.create({
      data: {
        userId: contribution.userId,
        type: 'CONTRIBUTION_APPROVED',
        title: 'Contribution Status Updated',
        message: `Your contribution status has been updated to ${status}`,
      },
    });

    res.json({
      success: true,
      message: 'Contribution status updated successfully',
      data: contribution,
    } as ApiResponse<any>);
  })
);

// VERIFY PAYMENT (Mock Webhook/Callback)
router.post(
  '/verify-payment',
  authenticateToken,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const { contributionId, gatewayRefId } = req.body;

    if (!contributionId) {
      res.status(400).json({ success: false, message: 'Missing contribution ID' } as ApiResponse<null>);
      return;
    }

    const contribution = await prisma.contribution.findUnique({
      where: { id: contributionId },
      include: { project: true }
    });

    if (!contribution) {
      res.status(404).json({ success: false, message: 'Contribution not found' } as ApiResponse<null>);
      return;
    }

    if (contribution.status === 'COMPLETED') {
      res.status(400).json({ success: false, message: 'Payment already verified' } as ApiResponse<null>);
      return;
    }

    // 1. Mark contribution as completed
    const updatedContribution = await prisma.contribution.update({
      where: { id: contributionId },
      data: { 
        status: 'COMPLETED',
        transactionId: gatewayRefId || contribution.transactionId 
      },
    });

    // 2. Increment project funding
    await prisma.project.update({
      where: { id: contribution.projectId },
      data: {
        fundingCollected: {
          increment: contribution.amount,
        },
      },
    });

    // 3. Create Notification
    await prisma.notification.create({
      data: {
        userId: contribution.userId,
        type: 'CONTRIBUTION_APPROVED',
        title: 'Investment Successful',
        message: `Your investment of NPR ${contribution.amount} into ${contribution.project.title} was successfully verified.`,
      },
    });

    res.json({
      success: true,
      message: 'Payment verified successfully',
      data: updatedContribution,
    } as ApiResponse<any>);
  })
);

export default router;
