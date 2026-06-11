import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { config } from './config.js';

// Route imports
import authRoutes from './routes/auth.js';
import projectRoutes from './routes/projects.js';
import contributionRoutes from './routes/contributions.js';
import dashboardRoutes from './routes/dashboard.js';
import milestoneRoutes from './routes/milestones.js';
import delayPredictionRoutes from './routes/delayPrediction.js';
import chatRoutes from './routes/chat.js';
import communityRoutes from './routes/community.js';
import projectCommentRoutes from './routes/projectComments.js';
import adminDashboardRoutes from './routes/adminDashboard.js';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { PrismaClient } from '@prisma/client';
import { setIO } from './socketInstance.js';

const prisma = new PrismaClient();

dotenv.config();

const app = express();
const PORT = config.server.port;
const httpServer = createServer(app);

// Setup Socket.IO
export const io = new Server(httpServer, {
  cors: {
    origin: config.cors.origin,
    credentials: true,
  }
});

// Make io available to route files via shared module
setIO(io);

// Socket Events
io.on('connection', (socket) => {
  console.log('Client connected to Community Hub:', socket.id);

  socket.on('join_community', () => {
    socket.join('community_room');
  });

  socket.on('send_message', async (data) => {
    try {
      const msg = await prisma.communityMessage.create({
        data: {
          content: data.content,
          authorId: data.authorId || null,
          authorName: data.authorName || 'Anonymous',
        },
        include: { author: { select: { name: true, avatar: true } } }
      });
      // Broadcast to all clients in the room
      io.to('community_room').emit('new_message', msg);
    } catch (error) {
      console.error('Socket message error:', error);
    }
  });

  socket.on('join_project_room', (projectId) => {
    socket.join(`project_${projectId}`);
  });

  socket.on('leave_project_room', (projectId) => {
    socket.leave(`project_${projectId}`);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// ─── Middleware ────────────────────────────────────────────
app.use(cors({
  origin: config.cors.origin,
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ─── Health check ─────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({ success: true, message: 'RemitBikas API is running' });
});

// ─── API Routes ───────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/contributions', contributionRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/milestones', milestoneRoutes);
app.use('/api/delay-prediction', delayPredictionRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/community', communityRoutes);
app.use('/api/projects/:projectId/comments', projectCommentRoutes);
app.use('/api/admin', adminDashboardRoutes);

// ─── 404 handler ──────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// ─── Global error handler ─────────────────────────────────
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Error:', err);
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';
  res.status(statusCode).json({
    success: false,
    message,
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
});

// ─── Start server ─────────────────────────────────────────
httpServer.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║    🚀 RemitBikas Backend Server       ║
║    Environment: ${config.server.nodeEnv.padEnd(20)}║
║    Port: ${String(PORT).padEnd(25)}║
║    Database: PostgreSQL                ║
║    WebSockets: Enabled                 ║
╚════════════════════════════════════════╝
  
📍 API running at: http://localhost:${PORT}
📋 API Docs: http://localhost:${PORT}/api
`);
});

export default app;