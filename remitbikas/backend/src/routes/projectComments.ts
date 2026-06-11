import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { getIO } from '../socketInstance.js';

const router = express.Router({ mergeParams: true });
const prisma = new PrismaClient();

// Get comments for a project
router.get('/', async (req: Request<{ projectId: string }>, res: Response) => {
  try {
    const { projectId } = req.params;
    const comments = await prisma.projectComment.findMany({
      where: { projectId },
      orderBy: { createdAt: 'asc' },
    });
    res.json({ success: true, data: comments });
  } catch (error: any) {
    console.error('Error fetching project comments:', error);
    res.status(500).json({ success: false, message: 'Failed to load comments' });
  }
});

// Submit a new comment for a project
router.post('/', async (req: Request<{ projectId: string }>, res: Response) => {
  try {
    const { projectId } = req.params;
    const { content, authorId, authorName } = req.body;

    if (!content) {
      res.status(400).json({ success: false, message: 'Content is required' });
      return;
    }

    const comment = await prisma.projectComment.create({
      data: {
        projectId,
        content,
        authorId: authorId || null,
        authorName: authorName || 'Anonymous',
      }
    });

    // Broadcast the new comment to users viewing this project
    getIO().to(`project_${projectId}`).emit('new_project_comment', comment);

    res.json({ success: true, data: comment });
  } catch (error: any) {
    console.error('Error submitting project comment:', error);
    res.status(500).json({ success: false, message: 'Failed to submit comment' });
  }
});

// Like a comment (This route doesn't strictly need projectId in URL, but we'll include it for namespace)
router.post('/:commentId/like', async (req: Request<{ projectId: string; commentId: string }>, res: Response) => {
  try {
    const { projectId, commentId } = req.params;

    const updatedComment = await prisma.projectComment.update({
      where: { id: commentId },
      data: {
        likes: { increment: 1 }
      }
    });

    // Broadcast the like update to users viewing this project
    getIO().to(`project_${projectId}`).emit('comment_liked', { commentId, likes: updatedComment.likes });

    res.json({ success: true, data: updatedComment });
  } catch (error: any) {
    console.error('Error liking comment:', error);
    res.status(500).json({ success: false, message: 'Failed to like comment' });
  }
});

export default router;
