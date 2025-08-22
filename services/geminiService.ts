import { GoogleGenAI, GenerateImagesResponse } from "@google/genai";
import { EnhancementOptions } from '../types';

let aiInstance: GoogleGenAI | null = null;
let currentApiKey: string | null = null;

/**
 * Manages the GoogleGenAI client instance.
 * It creates a new instance only when the API key changes.
 */
const getAiClient = (apiKey: string): GoogleGenAI => {
    if (apiKey === currentApiKey && aiInstance) {
        return aiInstance;
    }
    
    if (!apiKey) {
        throw new Error("API Key is not provided.");
    }
    
    aiInstance = new GoogleGenAI({ apiKey });
    currentApiKey = apiKey;
    return aiInstance;
};


/**
 * Determines the closest supported aspect ratio for the given image dimensions.
 */
const getBestAspectRatio = (width: number, height: number): "1:1" | "3:4" | "4:3" | "9:16" | "16:9" => {
    const ratio = width / height;
    const supportedRatios = {
        "16:9": 16 / 9,
        "9:16": 9 / 16,
        "4:3": 4 / 3,
        "3:4": 3 / 4,
        "1:1": 1,
    };

    let closest: keyof typeof supportedRatios = "1:1";
    let minDiff = Math.abs(ratio - supportedRatios[closest]);

    for (const r of (Object.keys(supportedRatios) as Array<keyof typeof supportedRatios>)) {
        const diff = Math.abs(ratio - supportedRatios[r]);
        if (diff < minDiff) {
            minDiff = diff;
            closest = r;
        }
    }
    return closest;
}

/**
 * Step 1: Use Gemini Flash to analyze the source image and generate a clean, literal description.
 */
export const createFinalPromptForImagen = async (
  apiKey: string,
  base64Image: string,
  options: EnhancementOptions,
  oneTap: boolean
): Promise<string> => {
  const imagePart = {
    inlineData: {
      mimeType: 'image/jpeg',
      data: base64Image,
    },
  };

  const textPart = {
    text: `You are a photo cataloger. Your task is to provide a neutral, factual, object-based description of the provided image. Be concise and literal. Examples: 'A woman with blonde hair smiling', 'a red sports car on a racetrack', 'a landscape with mountains and a lake'. Your response must ONLY be the description. Do not add any extra text, explanations, or formatting.`,
  };
  
  try {
    const ai = getAiClient(apiKey);
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: { parts: [imagePart, textPart] },
        config: {
          stopSequences: ["\n"]
        }
    });

    const description = response.text.trim();

    if (!description || description.length < 5 || description.length > 300) {
      console.error("Gemini failed to generate a valid description. Response:", description);
      throw new Error(`AI failed to create enhancement instructions. The AI's analysis was invalid.`);
    }

    // --- PROFESSIONAL KEYWORD-DRIVEN ARCHITECTURE ---
    const promptParts: string[] = [];

    // 1. Subject First
    promptParts.push(description);

    // 2. The Law of Absolute Fidelity (Non-Negotiable)
    promptParts.push(
      'perfect 1:1 faithful restoration of the subject',
      'exact likeness',
      'carbon copy of the composition'
    );

    // 3. Actionable Enhancements
    const enhancementKeywords: string[] = [];
    if (oneTap) {
        enhancementKeywords.push("upscaled to 16K resolution", "remove all digital noise and artifacts", "apply professional cinematic color grading", "perfectly sharpen details", "tack-sharp focus");
    } else {
        if (options.oldPhotoRestore) {
            enhancementKeywords.push("flawless restoration of vintage photograph", "repair all physical damage (scratches, dust, tears, creases)", "perfectly restore faded colors to their original vibrancy", "correct exposure and contrast issues");
        } else {
            if (options.upscale) enhancementKeywords.push("upscaled to 16K resolution", "crystal clear clarity");
            if (options.noiseReduction) enhancementKeywords.push("eliminate all digital noise and compression artifacts", "perfectly smooth gradients");
            if (options.faceDetail) enhancementKeywords.push("enhance facial features with hyper-realistic detail", "add natural skin texture", "ensure eyes are sharp and clear");
        }
    }
    
    if (enhancementKeywords.length === 0 && !oneTap && !options.oldPhotoRestore) {
        enhancementKeywords.push("subtly enhance clarity", "perform minor color correction");
    }

    promptParts.push(...enhancementKeywords);

    // 4. Elite Style Keywords
    promptParts.push(
      'masterpiece',
      'professional photography',
      'taken with Hasselblad camera',
      'Zeiss prime lens',
      'tack-sharp focus',
      'photorealistic',
      'hyper-realistic detail',
      'like watching the actual real thing live',
      'cinematic color grade'
    );
    
    // Join all parts into a single, stable, comma-separated string.
    const finalPrompt = promptParts.filter(p => p).join(', ');
    
    console.log("Generated final prompt for Imagen:", finalPrompt);

    return finalPrompt;

  } catch (error) {
    console.error("Error creating master prompt with Gemini:", error);
    if (error instanceof Error) {
        throw error;
    }
    throw new Error("AI failed to analyze the image and create enhancement instructions.");
  }
};


/**
 * Step 2: Use Imagen to generate a new, high-quality image based on the master prompt.
 */
export const generateImageFromPrompt = async (
  apiKey: string,
  prompt: string,
  dimensions: { width: number, height: number }
): Promise<string> => {
  const aspectRatio = getBestAspectRatio(dimensions.width, dimensions.height);

  try {
    const ai = getAiClient(apiKey);
    const response: GenerateImagesResponse = await ai.models.generateImages({
        model: 'imagen-3.0-generate-002',
        prompt: prompt,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/png',
          aspectRatio: aspectRatio
        },
    });
    
    if (!response.generatedImages || response.generatedImages.length === 0) {
        console.error("Imagen response was empty. Full response:", JSON.stringify(response, null, 2));
        throw new Error("The AI model failed to generate an image. This can happen with complex source images or if the AI's instructions were not clear. Please try a different image or adjust the options.");
    }

    const firstResult: any = response.generatedImages[0];

    if (!firstResult.image?.imageBytes) {
        let reason = "The AI model did not return a valid image. This may be due to a temporary API issue or a problem with the generated instructions. Please try again.";
        if (firstResult.finishReason) {
             if (firstResult.finishReason === 'SAFETY') {
                const blockedRating = firstResult.safetyRatings?.find((r: any) => r.blocked);
                reason = `The request was blocked by a safety policy. ${blockedRating ? `Reason: ${blockedRating.category}.` : '' } Please try a different image or selection.`;
            } else {
                reason = `Image generation failed. Reason: ${firstResult.finishReason}.`;
            }
        }
        throw new Error(reason);
    }
    
    return firstResult.image.imageBytes;

  } catch (error) {
    console.error("Error generating enhanced image with Imagen:", error);
    if (error instanceof Error) {
        throw error;
    }
    throw new Error("An unknown error occurred while communicating with the image generation AI.");
  }
};