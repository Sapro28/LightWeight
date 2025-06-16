import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { createNutritionPlan, buildWorkoutRoutine } from "@/lib/aiInstructions";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    console.log("📝 Received prompt:", prompt);

    const lowerPrompt = prompt.toLowerCase();
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-001",
      generationConfig: {
        temperature: 0.3, // Lower temperature for more consistent responses
        topP: 0.9,
        responseMimeType: "application/json", // Force JSON response
      },
    });

    let finalPrompt = "";

    if (lowerPrompt.includes("professional nutrition coach")) {
      finalPrompt = createNutritionPlan(prompt);
    } else if (lowerPrompt.includes("experienced fitness trainer")) {
      finalPrompt = buildWorkoutRoutine(prompt);
    } else {
      finalPrompt = `You are Cal O'Rie, a world-class fitness AI. Help the user with short, smart answers focused on workouts, diet, injury recovery, or exercise routines.
User asked: "${prompt}"

Respond with helpful fitness advice in plain text (not JSON).`;
    }

    console.log("🚀 Sending to Gemini:", finalPrompt.substring(0, 200) + "...");

    const result = await model.generateContent(finalPrompt);
    const response = await result.response;
    let text = await response.text();

    text = text.replace(/```json\s*|\s*```/g, "").trim();

    console.log("✅ Gemini response:", text.substring(0, 200) + "...");

    return NextResponse.json({
      response: text,
      success: true,
    });
  } catch (err) {
    console.error("❌ Gemini API error:", err);
    return NextResponse.json(
      {
        response: "Sorry, I couldn't process your request. Please try again.",
        success: false,
        error: err instanceof Error ? err.message : String(err),
      },
      { status: 500 }
    );
  }
}
