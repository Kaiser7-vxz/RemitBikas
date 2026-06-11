import express from 'express';
import { PrismaClient } from '@prisma/client';
import { GoogleGenAI } from '@google/genai';

const router = express.Router();
const prisma = new PrismaClient();

// Initialize the Gemini client
const ai = process.env.GEMINI_API_KEY ? new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY }) : null;

router.post('/', async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      res.status(400).json({ error: 'Messages array is required.' });
      return;
    }

    if (!ai) {
      res.status(503).json({ 
        error: 'AI Service is not configured. Please add GEMINI_API_KEY to the backend .env file.' 
      });
      return;
    }

    // 1. Retrieve Platform Context from the Database (RAG)
    const activeProjects = await prisma.project.findMany({
      where: { status: 'ONGOING' },
      select: {
        title: true,
        type: true,
        location: true,
        totalBudget: true,
        completionPercentage: true,
        fundingCollected: true,
        fundingTarget: true,
      },
      take: 5
    });

    const contextData = activeProjects.map(p => 
      `- ${p.title} (${p.type}) in ${p.location}: ${p.completionPercentage}% complete. Budget: Rs ${p.totalBudget}. Funds: Rs ${p.fundingCollected}/${p.fundingTarget}`
    ).join('\n');

    // 2. Formulate the System Prompt
    const systemInstruction = `
You are the official AI Assistant for RemitBikas, Nepal's premier digital public infrastructure platform. 
RemitBikas channels Nepal's annual remittance inflow into transparent, milestone-based local infrastructure projects.

Your core objectives are to:
- Answer questions about RemitBikas' purpose and services.
- Help users navigate the platform and find projects to co-fund.
- Be polite, professional, concise, and highly encouraging.
- Format responses cleanly using Markdown (use bullet points and bold text where helpful).

Here is the current live data from the platform database:
Active Ongoing Projects:
${contextData || "No active projects at the moment."}

When asked about projects, prioritize the ones listed above. Ensure your responses are grounded in this data. Do not hallucinate project names.
`;

    // 3. Format messages for Gemini API
    const formattedMessages = messages.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    // 4. Call Gemini Model
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: formattedMessages,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    const aiMessage = response.text;

    res.json({
      success: true,
      data: {
        role: 'assistant',
        content: aiMessage
      }
    });

  } catch (error: any) {
    console.error('AI Chat Error:', error);
    res.status(500).json({ success: false, message: 'Failed to generate response', details: error.message });
  }
});

export default router;
