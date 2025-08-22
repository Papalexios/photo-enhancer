import { useState, useCallback } from 'react';
import { createFinalPromptForImagen, generateImageFromPrompt } from '../services/geminiService';
import { EnhancementOptions } from '../types';

const loadingMessages = [
  "Analyzing image details...",
  "Identifying visual flaws...",
  "Crafting enhancement instructions...",
  "Contacting generation AI...",
  "Reconstructing image data...",
  "Applying cinematic color grade...",
  "Rendering final masterpiece...",
  "Almost there, polishing pixels...",
];

export const useImageEnhancer = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [enhancedImage, setEnhancedImage] = useState<string | null>(null);
  const [imageDimensions, setImageDimensions] = useState<{ width: number, height: number } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const fileToInfo = (file: File): Promise<{ base64: string, width: number, height: number }> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        const img = new Image();
        img.onload = () => {
          resolve({
            base64: result,
            width: img.width,
            height: img.height,
          });
        };
        img.onerror = (err) => reject(new Error('Could not load image to determine dimensions.'));
        img.src = result;
      };
      reader.onerror = (err) => reject(err);
    });
  };

  const handleImageUpload = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image file.');
      return;
    }
    setError(null);
    setEnhancedImage(null);
    try {
      const { base64, width, height } = await fileToInfo(file);
      setOriginalImage(base64);
      setImageDimensions({ width, height });
    } catch (err) {
      setError('Failed to read image file.');
      console.error(err);
    }
  }, []);

  const enhanceImage = useCallback(async (options: EnhancementOptions, oneTap: boolean) => {
    if (!originalImage || !imageDimensions) {
      setError('No image or image dimensions available to enhance.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setEnhancedImage(null);
    let messageIndex = 0;
    setLoadingMessage(loadingMessages[messageIndex]);
    const messageInterval = setInterval(() => {
        messageIndex = (messageIndex + 1) % loadingMessages.length;
        setLoadingMessage(loadingMessages[messageIndex]);
    }, 2500);

    try {
      const imageData = originalImage.split(',')[1];
      
      setLoadingMessage("Crafting enhancement instructions...");
      const finalPrompt = await createFinalPromptForImagen(imageData, options, oneTap);
      
      setLoadingMessage("Generating enhanced version...");
      const newImageBase64 = await generateImageFromPrompt(finalPrompt, imageDimensions);
      
      setEnhancedImage(`data:image/png;base64,${newImageBase64}`);

    } catch (err) {
      console.error(err);
      let friendlyErrorMessage = 'An unknown error occurred during enhancement.';

      if (err instanceof Error) {
        // Attempt to parse the error message as JSON, which the API sometimes returns
        try {
          const errorJson = JSON.parse(err.message);
          if (errorJson?.error?.message) {
            friendlyErrorMessage = `API Error: ${errorJson.error.message}`;
          } else {
            friendlyErrorMessage = err.message;
          }
        } catch (parseError) {
          // If parsing fails, it's just a regular string message
          friendlyErrorMessage = err.message;
        }
      }
      
      setError(`Failed to enhance image. ${friendlyErrorMessage}`);
    } finally {
      clearInterval(messageInterval);
      setIsLoading(false);
      setLoadingMessage('');
    }
  }, [originalImage, imageDimensions]);
  
  const resetImages = useCallback(() => {
    setOriginalImage(null);
    setEnhancedImage(null);
    setImageDimensions(null);
    setError(null);
  }, []);

  return {
    originalImage,
    enhancedImage,
    isLoading,
    loadingMessage,
    error,
    handleImageUpload,
    enhanceImage,
    resetImages
  };
};