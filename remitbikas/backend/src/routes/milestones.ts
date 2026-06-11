import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { asyncHandler, authenticateToken } from '../middleware/index.js';
import { AuthRequest, ApiResponse } from '../types/index.js';

const router = Router();
const prisma = new PrismaClient();

// CREATE MILESTONE
router.post(
  '/',
  authenticateToken,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    if (!['ADMIN', 'MUNICIPAL_OFFICER'].includes(req.user?.role || '')) {
      res.status(403).json({
        success: false,
        message: 'Only admins and officers can create milestones',
      } as ApiResponse<null>);
      return;
    }

    const { projectId, title, description, targetDate } = req.body;

    if (!projectId || !title || !targetDate) {
      res.status(400).json({
        success: false,
        message: 'Missing required fields',
      } as ApiResponse<null>);
      return;
    }

    const milestone = await prisma.milestone.create({
      data: {
        projectId,
        title,
        description,
        targetDate: new Date(targetDate),
      },
    });

    res.status(201).json({
      success: true,
      message: 'Milestone created successfully',
      data: milestone,
    } as ApiResponse<any>);
  })
);

// GET PROJECT MILESTONES
router.get(
  '/project/:projectId',
  asyncHandler(async (req: Request, res: Response) => {
    const milestones = await prisma.milestone.findMany({
      where: { projectId: req.params.projectId },
      orderBy: { targetDate: 'asc' },
    });

    res.json({
      success: true,
      message: 'Milestones retrieved successfully',
      data: milestones,
    } as ApiResponse<any>);
  })
);

// UPDATE MILESTONE
router.put(
  '/:id',
  authenticateToken,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    if (!['ADMIN', 'MUNICIPAL_OFFICER'].includes(req.user?.role || '')) {
      res.status(403).json({
        success: false,
        message: 'Only admins and officers can update milestones',
      } as ApiResponse<null>);
      return;
    }

    const { title, description, status, completionPercentage, completedDate } = req.body;

    const milestone = await prisma.milestone.update({
      where: { id: req.params.id },
      data: {
        ...(title && { title }),
        ...(description && { description }),
        ...(status && { status }),
        ...(completionPercentage !== undefined && { completionPercentage }),
        ...(completedDate && { completedDate: new Date(completedDate) }),
      },
    });

    res.json({
      success: true,
      message: 'Milestone updated successfully',
      data: milestone,
    } as ApiResponse<any>);
  })
);

export default router;
