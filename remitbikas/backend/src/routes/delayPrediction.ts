import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { asyncHandler } from '../middleware/index.js';
import { ApiResponse } from '../types/index.js';

const router = Router();
const prisma = new PrismaClient();

// SIMPLE DELAY PREDICTION (placeholder)
router.post(
  '/predict/:projectId',
  asyncHandler(async (req: Request, res: Response) => {
    const project = await prisma.project.findUnique({
      where: { id: req.params.projectId },
      include: { milestones: true },
    });

    if (!project) {
      res.status(404).json({
        success: false,
        message: 'Project not found',
      } as ApiResponse<null>);
      return;
    }

    // Simple prediction based on current completion rate
    const daysSinceStart = Math.floor(
      (new Date().getTime() - project.startDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    const projectedDuration = Math.floor(
      (daysSinceStart / project.completionPercentage) * 100
    );
    const originalDuration = Math.floor(
      (project.expectedEndDate.getTime() - project.startDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    const delayDays = Math.max(0, projectedDuration - originalDuration);
    const delayPercentage = ((delayDays / originalDuration) * 100).toFixed(2);

    res.json({
      success: true,
      message: 'Delay prediction calculated',
      data: {
        projectedEndDate: new Date(
          project.startDate.getTime() + projectedDuration * 24 * 60 * 60 * 1000
        ),
        delayDays,
        delayPercentage: parseFloat(delayPercentage),
        riskLevel: delayDays > 60 ? 'CRITICAL' : delayDays > 30 ? 'HIGH' : 'MEDIUM',
      },
    } as ApiResponse<any>);
  })
);

export default router;
