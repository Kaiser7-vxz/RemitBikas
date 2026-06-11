import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { asyncHandler, authenticateToken } from '../middleware/index.js';
import { AuthRequest, ApiResponse, ProjectFilter } from '../types/index.js';

const router = Router();
const prisma = new PrismaClient();

// GET ALL PROJECTS WITH FILTERS
router.get(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const { status, type, search, page = 1, limit = 10 } = req.query as any;
    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 10;

    const where: any = {};

    if (status) where.status = status;
    if (type) where.type = type;
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const projects = await prisma.project.findMany({
      where,
      skip: (pageNum - 1) * limitNum,
      take: limitNum,
      include: {
        milestones: { take: 3 },
        _count: {
          select: { contributions: true, reviews: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    const total = await prisma.project.count({ where });

    res.json({
      success: true,
      message: 'Projects retrieved successfully',
      data: {
        projects,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit),
        },
      },
    } as ApiResponse<any>);
  })
);

// GET PROJECT STATS (must be registered before /:id)
router.get(
  '/stats/overview',
  asyncHandler(async (req: Request, res: Response) => {
    const total = await prisma.project.count();
    const ongoing = await prisma.project.count({
      where: { status: 'ONGOING' },
    });
    const completed = await prisma.project.count({
      where: { status: 'COMPLETED' },
    });
    const planning = await prisma.project.count({
      where: { status: 'PLANNING' },
    });
    const tender = await prisma.project.count({
      where: { status: 'TENDER' },
    });

    const projects = await prisma.project.findMany({
      select: { totalBudget: true, spentBudget: true, completionPercentage: true },
    });

    const totalBudget = projects.reduce((sum: number, p: any) => sum + p.totalBudget, 0);
    const fundsCollected = projects.reduce((sum: number, p: any) => sum + p.spentBudget, 0);
    const avgCompletion =
      projects.length > 0
        ? projects.reduce((sum: number, p: any) => sum + p.completionPercentage, 0) / projects.length
        : 0;

    res.json({
      success: true,
      message: 'Statistics retrieved successfully',
      data: {
        total,
        ongoing,
        completed,
        planning,
        tender,
        totalBudget,
        fundsCollected,
        avgCompletion: Math.round(avgCompletion),
      },
    } as ApiResponse<any>);
  })
);

// GET PROJECT BY ID
router.get(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const project = await prisma.project.findUnique({
      where: { id: req.params.id },
      include: {
        milestones: true,
        contributions: {
          select: {
            id: true,
            amount: true,
            status: true,
            createdAt: true,
            user: { select: { name: true } },
          },
        },
        expenses: true,
        attachments: true,
        reviews: {
          include: { user: { select: { name: true, avatar: true } } },
        },
        delayAnalysis: true,
        reputationScore: true,
      },
    });

    if (!project) {
      res.status(404).json({
        success: false,
        message: 'Project not found',
      } as ApiResponse<null>);
      return;
    }

    res.json({
      success: true,
      message: 'Project retrieved successfully',
      data: project,
    } as ApiResponse<any>);
  })
);

// CREATE PROJECT (Admin/Officer only)
router.post(
  '/',
  authenticateToken,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    if (!['ADMIN', 'MUNICIPAL_OFFICER'].includes(req.user?.role || '')) {
      res.status(403).json({
        success: false,
        message: 'Only admins and officers can create projects',
      } as ApiResponse<null>);
      return;
    }

    const {
      title,
      description,
      type,
      totalBudget,
      location,
      latitude,
      longitude,
      startDate,
      expectedEndDate,
      contractor,
      contractorContact,
    } = req.body;

    if (!title || !description || !type || !totalBudget || !location) {
      res.status(400).json({
        success: false,
        message: 'Missing required fields',
      } as ApiResponse<null>);
      return;
    }

    const project = await prisma.project.create({
      data: {
        title,
        description,
        type,
        totalBudget,
        location,
        latitude: latitude ? parseFloat(latitude) : null,
        longitude: longitude ? parseFloat(longitude) : null,
        startDate: new Date(startDate),
        expectedEndDate: new Date(expectedEndDate),
        contractor,
        contractorContact,
      },
    });

    // Create initial reputation score
    await prisma.reputationScore.create({
      data: {
        projectId: project.id,
      },
    });

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: project,
    } as ApiResponse<any>);
  })
);

// UPDATE PROJECT
router.put(
  '/:id',
  authenticateToken,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    if (!['ADMIN', 'MUNICIPAL_OFFICER'].includes(req.user?.role || '')) {
      res.status(403).json({
        success: false,
        message: 'Only admins and officers can update projects',
      } as ApiResponse<null>);
      return;
    }

    const { title, description, status, completionPercentage, spentBudget } = req.body;

    const project = await prisma.project.update({
      where: { id: req.params.id },
      data: {
        ...(title && { title }),
        ...(description && { description }),
        ...(status && { status }),
        ...(completionPercentage !== undefined && { completionPercentage }),
        ...(spentBudget !== undefined && { spentBudget }),
      },
    });

    res.json({
      success: true,
      message: 'Project updated successfully',
      data: project,
    } as ApiResponse<any>);
  })
);

// DELETE PROJECT
router.delete(
  '/:id',
  authenticateToken,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    if (!['ADMIN', 'MUNICIPAL_OFFICER'].includes(req.user?.role || '')) {
      res.status(403).json({
        success: false,
        message: 'Only admins and officers can delete projects',
      } as ApiResponse<null>);
      return;
    }

    await prisma.project.delete({
      where: { id: req.params.id },
    });

    res.json({
      success: true,
      message: 'Project deleted successfully',
      data: null,
    } as ApiResponse<any>);
  })
);

export default router;
