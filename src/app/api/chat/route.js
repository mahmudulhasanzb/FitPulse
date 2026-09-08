import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { streamText, convertToModelMessages } from 'ai';

// Support both GEMINI_API_KEY and GOOGLE_GENERATIVE_AI_API_KEY
const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(req) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return Response.json(
        { error: 'Valid messages array is required.' },
        { status: 400 },
      );
    }

    // Convert UI messages (with parts) to Model messages format
    const modelMessages = await convertToModelMessages(messages);

    const result = streamText({
      model: google('gemini-3.6-flash'),
      system: `You are "FitPulse Coach", an energetic, elite personal trainer and wellness AI assistant built into the FitPulse platform.
Your goals:
1. Provide practical, science-backed workout splits, exercise form tips, calorie/macro breakdowns, and recovery advice.
2. Direct users to FitPulse platform features (Classes, Trainer booking, Community Forum, Subscription plans).
3. Maintain an energetic, motivating, and friendly gym coach tone.
4. Keep responses crisp, well-formatted with bullet points and bold highlights.
5. Remind users to stay hydrated and warm up properly.
6. if the user asks to "book a class" or this type of words then instruct him to visit "https://fitpulse-gym-management.vercel.app/classes" for booking a class.
7. if the user ask any irrelevant question then ignore it and say that "Umm, Actually I am here to help you with your fitness journey, and I think this question "{user_question}" is irrelevant to fitness. So, please ask me anything related to fitness." `,
      messages: modelMessages,
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error('FitPulse AI Chat Error:', error);
    return Response.json(
      { error: error?.message || 'Failed to stream response from AI Coach.' },
      { status: 500 },
    );
  }
}
