import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { GEMINI_TEXT_MODEL } from "../constants";

// IMPORTANT: API key handling as per guidelines.
// The API key MUST be obtained EXCLUSIVELY from `process.env.API_KEY`.
// This variable is assumed to be pre-configured and accessible.
// DO NOT add UI elements or prompts for API key input.

// Guard against 'process' not being defined in the browser
const apiKey = (typeof process !== 'undefined' && process.env) ? process.env.API_KEY : undefined;

let ai: GoogleGenAI | null = null;

if (apiKey) {
  try {
    ai = new GoogleGenAI({ apiKey });
  } catch (error) {
    console.error("Failed to initialize GoogleGenAI, potentially due to invalid API key format or other init error:", error);
    // ai remains null, features will be disabled.
  }
} else {
  if (typeof process === 'undefined') {
    console.warn(
      "Node.js 'process' object not found. API_KEY from process.env cannot be accessed. " +
      "AI-powered features will be disabled unless API_KEY is provided through other means " +
      "or the execution environment makes it available."
    );
  } else {
    console.warn(
      "API_KEY for Gemini is not configured in `process.env.API_KEY`. " +
      "AI-powered features will be disabled. " +
      "Ensure the API_KEY environment variable is correctly set in your deployment environment."
    );
  }
}

export const generateBusinessDescription = async (businessName: string, businessCategory: string, keywords?: string): Promise<string> => {
  if (!ai) {
    console.warn("Gemini AI service not initialized. Returning placeholder description.");
    return `[AI Description Placeholder] A ${businessCategory} named ${businessName}. ${keywords ? `Focusing on ${keywords}.` : ''} Please provide your own description as AI generation is currently unavailable. This may be due to a missing or invalid API Key, or the 'process.env' access method not being suitable for the current browser environment without a build step.`;
  }

  const prompt = `Generate a compelling and concise business description (under 60 words) for a new local business.
  Business Name: "${businessName}"
  Category: "${businessCategory}"
  ${keywords ? `Key features or services: ${keywords}.` : ''}
  The tone should be inviting, friendly, and highlight what makes it appealing to local residents, new movers, and students.
  Focus on creating a positive first impression.`;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: GEMINI_TEXT_MODEL,
      contents: prompt,
      config: {
        // Default thinkingConfig (enabled) for higher quality.
        temperature: 0.75, 
        topP: 0.9,
        topK: 40,
        // maxOutputTokens: 100, // Optional: to strictly control length
      }
    });
    
    const text = response.text;
    if (!text) {
        console.error("Gemini API returned an empty text response.");
        throw new Error("No text returned from AI.");
    }
    return text.trim();

  } catch (error) {
    console.error("Error generating description with Gemini:", error);
    if (error instanceof Error) {
        if (error.message.includes('API key not valid') || error.message.includes('PERMISSION_DENIED')) {
            throw new Error("The AI service API key is invalid or lacks permissions. Please contact support. You can write your own description.");
        }
         // Check for quota issues
        if (error.message.toLowerCase().includes('quota') || (error as any)?.status === 429) {
          throw new Error("AI service quota exceeded. Please try again later or contact support. You can write your own description.");
        }
    }
    throw new Error("Failed to generate AI description due to an unexpected error. Please try again or write your own.");
  }
};

// Placeholder for generating catalogue item descriptions (can be expanded)
export const generateCatalogueItemDescription = async (itemName: string, businessName: string, businessCategory: string): Promise<string> => {
  if (!ai) {
    return `[AI Description Placeholder] Description for ${itemName} at ${businessName}. AI generation unavailable.`;
  }
  // Similar implementation to generateBusinessDescription with a tailored prompt.
  const prompt = `Generate a concise and appealing description (under 30 words) for a product/service:
  Item Name: "${itemName}"
  Business: "${businessName}" (${businessCategory})
  Highlight its key benefit or feature.`;
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({ model: GEMINI_TEXT_MODEL, contents: prompt });
    return response.text?.trim() || "Description not available.";
  } catch (error) {
    console.error("Error generating catalogue item description:", error);
    return "Could not generate AI description for this item.";
  }
};