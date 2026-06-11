import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { asyncHandler, authenticateToken } from '../middleware/index.js';
import { AuthRequest, ApiResponse } from '../types/index.js';

const router = Router();
const prisma = new PrismaClient();

// Ensure only ADMIN or MUNICIPAL_OFFICER can access these routes
const authorizeAdmin = (req: AuthRequest, res: Response, next: Function) => {
  if (!['ADMIN', 'MUNICIPAL_OFFICER'].includes(req.user?.role || '')) {
    res.status(403).json({ success: false, message: 'Unauthorized access' } as ApiResponse<null>);
    return;
  }
  next();
};

router.use(authenticateToken, authorizeAdmin);

// ==========================================
// 1. CITIZENS & VOTES MODULE
// ==========================================
router.get(
  '/citizens',
  asyncHandler(async (req: AuthRequest, res: Response) => {
    // Fetch citizens
    const citizens = await prisma.user.findMany({
      where: { role: 'CITIZEN' },
      select: {
        id: true,
        name: true,
        email: true,
        active: true,
        createdAt: true,
        _count: { select: { reviews: true, reports: true } }
      },
      orderBy: { createdAt: 'desc' }
    });

    const totalVotes = await prisma.projectReview.count();
    const totalReports = await prisma.report.count();

    // Mock voting trend for chart since we don't have historical vote timestamps easily bucketed without raw SQL
    const votingTrends = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      data: [120, 190, 300, 250, 420, 600]
    };

    res.json({
      success: true,
      data: {
        citizens,
        stats: {
          total: citizens.length,
          active: citizens.filter(c => c.active).length,
          totalVotes,
          communityReports: totalReports,
        },
        votingTrends
      }
    });
  })
);

// ==========================================
// 2. INVESTMENTS MODULE
// ==========================================
router.get(
  '/investments',
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const investments = await prisma.contribution.findMany({
      include: {
        user: { select: { name: true, email: true } },
        project: { select: { title: true } }
      },
      orderBy: { createdAt: 'desc' }
    });

    const totalRaised = investments.reduce((sum, i) => sum + i.amount, 0);
    const uniqueInvestors = new Set(investments.map(i => i.userId)).size;

    res.json({
      success: true,
      data: {
        investments,
        stats: {
          totalInvestments: investments.length,
          totalInvestors: uniqueInvestors,
          fundsRaised: totalRaised
        }
      }
    });
  })
);

// ==========================================
// 3. TRANSPARENCY MODULE
// ==========================================
router.get(
  '/transparency',
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const expenses = await prisma.expense.findMany({
      include: { project: { select: { title: true } } },
      orderBy: { date: 'desc' }
    });

    const contributions = await prisma.contribution.aggregate({ _sum: { amount: true }, where: { status: 'COMPLETED' } });
    const totalFundsReceived = contributions._sum.amount || 0;
    
    const projects = await prisma.project.aggregate({ _sum: { totalBudget: true } });
    const totalAllocated = projects._sum.totalBudget || 0;

    const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);

    const expenseBreakdown = expenses.reduce((acc: any, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {});

    res.json({
      success: true,
      data: {
        expenses,
        stats: {
          totalFundsReceived,
          totalAllocated,
          totalSpent,
          remainingBalance: totalFundsReceived - totalSpent
        },
        expenseBreakdown
      }
    });
  })
);

// ==========================================
// 4. ANALYTICS MODULE
// ==========================================
router.get(
  '/analytics',
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const delayAnalysisList = await prisma.delayAnalysis.findMany({
      include: { project: { select: { title: true, status: true, totalBudget: true } } }
    });

    const highRiskProjects = delayAnalysisList.filter(d => d.riskLevel === 'HIGH');
    const delayedCount = delayAnalysisList.length;

    // Simulate Citizen Sentiment based on reviews
    const reviews = await prisma.projectReview.findMany();
    const positiveReviews = reviews.filter(r => r.rating >= 4).length;
    const negativeReviews = reviews.filter(r => r.rating <= 2).length;

    res.json({
      success: true,
      data: {
        delayAnalysis: delayAnalysisList,
        stats: {
          highRiskCount: highRiskProjects.length,
          delayedCount,
          sentiment: { positive: positiveReviews, negative: negativeReviews }
        }
      }
    });
  })
);

// ==========================================
// 5. SETTINGS MODULE
// ==========================================
router.get(
  '/settings',
  asyncHandler(async (req: AuthRequest, res: Response) => {
    // Just fetch the admin's info for the settings page
    const adminUser = await prisma.user.findUnique({
      where: { id: req.user!.id },
      select: { name: true, email: true, phone: true }
    });

    res.json({
      success: true,
      data: {
        profile: adminUser,
        system: {
          municipalityName: "RemitBikas Municipality",
          emailAlerts: true,
          smsAlerts: false,
          twoFactorAuth: false
        }
      }
    });
  })
);

router.put(
  '/settings/profile',
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const { name, phone } = req.body;
    const updatedUser = await prisma.user.update({
      where: { id: req.user!.id },
      data: { name, phone },
      select: { name: true, email: true, phone: true }
    });

    res.json({ success: true, data: updatedUser, message: "Profile updated successfully" });
  })
);

export default router;
