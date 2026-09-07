import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return Response.json(
        { error: "GEMINI_API_KEY is not configured in .env" },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return Response.json(
        { error: "Valid messages array is required." },
        { status: 400 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-3.6-flash",
      systemInstruction: `You are "FitPulse Coach", an energetic, elite personal trainer and wellness AI assistant built into the FitPulse platform.
Your goals:
1. Provide practical, science-backed workout splits, exercise form tips, calorie/macro breakdowns, and recovery advice.
2. Direct users to FitPulse platform features (Classes, Trainer booking, Community Forum, Subscription plans).
3. Maintain an energetic, motivating, and friendly gym coach tone.
4. Keep responses crisp, well-formatted with bullet points and bold highlights.
5. Remind users to stay hydrated and warm up properly.`
    });

    // Format previous messages for Gemini startChat history
    // Roles in Gemini must be 'user' or 'model'
    const history = messages.slice(0, -1).map((msg) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }]
    }));

    const chat = model.startChat({ history });
    const lastUserMessage = messages[messages.length - 1]?.content || "";

    const result = await chat.sendMessage(lastUserMessage);
    const reply = result.response.text();

    return Response.json({ reply });
  } catch (error) {
    console.error("FitPulse AI Chat Error:", error);
    return Response.json(
      { error: error?.message || "Failed to get response from Gemini AI." },
      { status: 500 }
    );
  }
}
