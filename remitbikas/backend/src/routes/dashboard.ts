import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { asyncHandler, authenticateToken } from '../middleware/index.js';
import { AuthRequest, ApiResponse } from '../types/index.js';

const router = Router();
const prisma = new PrismaClient();

// GET DASHBOARD DATA
router.get(
  '/',
  authenticateToken,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const user = await prisma.user.findUnique({
      where: { id: req.user?.id },
    });

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found',
      } as ApiResponse<null>);
      return;
    }

    // Get user statistics based on role
    let stats: any = {};

    if (user.role === 'CITIZEN') {
      const contributions = await prisma.contribution.findMany({
        where: { userId: user.id },
      });

      stats = {
        totalContributed: contributions.reduce((sum: number, c: any) => sum + c.amount, 0),
        contributionCount: contributions.length,
        projectsContributed: new Set(contributions.map((c: any) => c.projectId)).size,
        averageContribution:
          contributions.length > 0
            ? contributions.reduce((sum: number, c: any) => sum + c.amount, 0) / contributions.length
            : 0,
      };
    } else if (user.role === 'CONTRACTOR') {
      const projects = await prisma.project.findMany({
        where: { contractor: user.name },
      });

      const completedProjects = projects.filter((p: any) => p.status === 'COMPLETED');

      stats = {
        projectsCompleted: completedProjects.length,
        projectsOngoing: projects.filter((p: any) => p.status === 'ONGOING').length,
        totalBudgetManaged: projects.reduce((sum: number, p: any) => sum + p.totalBudget, 0),
        avgCompletionTime: completedProjects.length,
      };
    }

    // Get recent projects
    const recentProjects = await prisma.project.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        status: true,
        completionPercentage: true,
      },
    });

    // Get notifications
    const notifications = await prisma.notification.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });

    res.json({
      success: true,
      message: 'Dashboard data retrieved successfully',
      data: {
        user: {
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
        },
        stats,
        recentProjects,
        notifications,
      },
    } as ApiResponse<any>);
  })
);

// GET SYSTEM OVERVIEW (Admin only)
router.get(
  '/admin/system-overview',
  authenticateToken,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    if (req.user?.role !== 'ADMIN') {
      res.status(403).json({
        success: false,
        message: 'Only admins can view system overview',
      } as ApiResponse<null>);
      return;
    }

    const [totalUsers, totalProjects, totalContributions, activeProjects, completedProjects] =
      await Promise.all([
        prisma.user.count(),
        prisma.project.count(),
        prisma.contribution.count(),
        prisma.project.count({ where: { status: 'ONGOING' } }),
        prisma.project.count({ where: { status: 'COMPLETED' } }),
      ]);

    const totalBudget = (
      await prisma.project.aggregate({
        _sum: { totalBudget: true },
      })
    )._sum.totalBudget || 0;

    const fundsCollected = (
      await prisma.contribution.aggregate({
        _sum: { amount: true },
        where: { status: 'COMPLETED' },
      })
    )._sum.amount || 0;

    res.json({
      success: true,
      message: 'System overview retrieved successfully',
      data: {
        totalUsers,
        totalProjects,
        totalContributions,
        activeProjects,
        completedProjects,
        totalBudget,
        fundsCollected,
      },
    } as ApiResponse<any>);
  })
);

export default router;
