import { Request } from 'express';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface ProjectStats {
  total: number;
  ongoing: number;
  completed: number;
  planning: number;
  tender: number;
  totalBudget: number;
  fundsCollected: number;
  avgCompletion: number;
}

export interface ContributorStats {
  totalContributed: number;
  contributionCount: number;
  projectsContributed: number;
  averageContribution: number;
}

export interface ContractorStats {
  projectsCompleted: number;
  projectsOngoing: number;
  avgCompletionTime: number;
  avgBudgetAccuracy: number;
  reputationScore: number;
}

export interface ProjectFilter {
  status?: string;
  type?: string;
  search?: string;
  page?: number;
  limit?: number;
}

// ===== VOTE TYPES =====
export interface Vote {
  id: string;
  userId: string;
  projectId: string;
  value: number;      // 1 = upvote, -1 = downvote
  createdAt: string;
  updatedAt: string;
}

export interface VoteSummary {
  upvotes: number;
  downvotes: number;
}

export interface ProjectVoteData {
  summary: VoteSummary;
  userVote: number | null;
}