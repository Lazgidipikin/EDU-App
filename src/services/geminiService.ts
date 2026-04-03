import { GoogleGenAI, Type } from "@google/genai";
import { AIPrediction, Grade, Attendance } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function predictStudentPerformance(
  studentId: string,
  grades: Grade[],
  attendance: Attendance[],
  behaviourNotes: string[]
): Promise<AIPrediction> {
  const prompt = `
    Analyze the following student data and predict their performance for the end of the term.
    
    Grades: ${JSON.stringify(grades)}
    Attendance: ${JSON.stringify(attendance)}
    Behaviour Notes: ${behaviourNotes.join(", ")}
    
    Provide a prediction including risk level (on-track, at-risk, critical), confidence score (0-1), predicted grade, and key factors.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          riskLevel: { type: Type.STRING, enum: ["on-track", "at-risk", "critical"] },
          confidence: { type: Type.NUMBER },
          predictedGrade: { type: Type.STRING },
          factors: {
            type: Type.OBJECT,
            properties: {
              attendance: { type: Type.NUMBER },
              caScores: { type: Type.NUMBER },
              assignmentCompletion: { type: Type.NUMBER },
              behaviour: { type: Type.STRING }
            },
            required: ["attendance", "caScores", "assignmentCompletion", "behaviour"]
          }
        },
        required: ["riskLevel", "confidence", "predictedGrade", "factors"]
      }
    }
  });

  const result = JSON.parse(response.text);
  return {
    studentId,
    ...result,
    timestamp: new Date().toISOString()
  };
}
