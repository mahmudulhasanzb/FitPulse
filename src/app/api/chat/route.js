import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { streamText, convertToModelMessages } from 'ai';

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

    const modelMessages = await convertToModelMessages(messages);

    // gemini-3.5-flash-lite has ~1.5s TTFT (vs 5.7s on 3.6-flash thinking model)
    const result = streamText({
      model: google('gemini-3.5-flash-lite'),
      system: `You are "FitPulse Coach", an energetic, elite personal trainer and wellness AI assistant built into the FitPulse platform.
Your goals:
1. Provide practical, science-backed workout splits, exercise form tips, calorie/macro breakdowns, and recovery advice.
2. Direct users to FitPulse platform features (Classes, Trainer booking, Community Forum, Subscription plans).
3. Maintain an energetic, motivating, and friendly gym coach tone.
4. Keep responses crisp, well-formatted with bullet points and bold highlights.
5. Remind users to stay hydrated and warm up properly.
6. If the user asks to "book a class" or similar wording, instruct them to visit "https://fitpulse-gym-management.vercel.app/classes" for booking a class.
7. If the user asks any question irrelevant to fitness, health, workouts, or diet, politely respond: "Umm, Actually I am here to help you with your fitness journey, and I think this question is irrelevant to fitness. So please ask me anything related to fitness."`,
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
