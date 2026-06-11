import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Get last 50 chat messages
router.get('/messages', async (_req, res) => {
  try {
    const messages = await prisma.communityMessage.findMany({
      take: 50,
      orderBy: { createdAt: 'asc' },
      include: {
        author: {
          select: { name: true, avatar: true }
        }
      }
    });
    res.json({ success: true, data: messages });
  } catch (error: any) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ success: false, message: 'Failed to load messages' });
  }
});

// Submit a new complaint/grievance
router.post('/complaints', async (req, res) => {
  try {
    const { title, description, category, submittedBy } = req.body;
    
    if (!title || !description || !category) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const complaint = await prisma.complaint.create({
      data: {
        title,
        description,
        category,
        submittedBy: submittedBy || null
      }
    });

    res.json({ success: true, data: complaint });
  } catch (error: any) {
    console.error('Error submitting complaint:', error);
    res.status(500).json({ success: false, message: 'Failed to submit complaint' });
  }
});

export default router;
