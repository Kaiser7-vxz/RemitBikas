import express from 'express';
import cors from 'cors';
import { Request } from 'express';

// Import routes
import projectRoutes from './routes/projects';
// ❌ DO NOT import voteRoutes

const app = express();

app.use(cors());
app.use(express.json());

// Use routes
app.use('/api/projects', projectRoutes);
// ❌ DO NOT use app.use('/api/votes', voteRoutes)

// ... rest of your server setup

// Export types (these remain unchanged)
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
// ... your existing types ...

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