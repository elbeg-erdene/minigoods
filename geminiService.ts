
import { GoogleGenAI } from "@google/genai";

// Fix: Strictly follow initialization guideline: new GoogleGenAI({ apiKey: process.env.API_KEY })
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getSmartRecommendations(cartItems: string[]) {
  // Fix: Removed unnecessary check for process.env.API_KEY as per guidelines
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `User has these items in their cart: ${cartItems.join(', ')}. Generate a short, persuasive, 1-sentence marketing message in Mongolian encouraging them to buy related products.`,
      config: {
        temperature: 0.7,
        maxOutputTokens: 100,
      }
    });

    // Fix: Access response.text property directly as per correct method
    return response.text?.trim() || "Танд зориулсан онцлох хямдралууд!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Танд санал болгох шилдэг бүтээгдэхүүнүүд.";
  }
}
