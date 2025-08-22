import React from 'react';
import { Header } from './components/Header';
import { ControlPanel } from './components/ControlPanel';
import { ImageViewer } from './components/ImageViewer';
import { UploadPlaceholder } from './components/UploadPlaceholder';
import { Loader } from './components/Loader';
import { Footer } from './components/Footer';
import { useImageEnhancer } from './hooks/useImageEnhancer';
import { EnhancementOptions } from './types';
import { API_KEY } from './services/geminiService';

function App(): React.ReactNode {
  const {
    originalImage,
    enhancedImage,
    isLoading,
    loadingMessage,
    error,
    handleImageUpload,
    enhanceImage,
    resetImages,
  } = useImageEnhancer();

  const [enhancementOptions, setEnhancementOptions] = React.useState<EnhancementOptions>({
    upscale: true,
    noiseReduction: true,
    faceDetail: true,
    oldPhotoRestore: false,
  });

  const isKeyMissing = API_KEY === "YOUR_API_KEY_HERE";

  const handleEnhancement = (oneTap: boolean) => {
    if (originalImage) {
      enhanceImage(enhancementOptions, oneTap);
    }
  };

  const handleDownload = () => {
    if (!enhancedImage) return;
    const link = document.createElement('a');
    link.href = enhancedImage;
    link.download = 'enhanced-photo.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isKeyMissing) {
    return (
      <div className="min-h-screen flex flex-col bg-premium-gradient">
        <Header />
        <main className="flex-grow flex items-center justify-center p-6 md:p-8">
          <div className="text-center text-[var(--color-error)] p-8 bg-rose-500/10 rounded-lg border border-rose-500/20 max-w-xl">
            <h3 className="text-2xl font-bold">Action Required: Add API Key</h3>
            <p className="mt-4 text-[var(--color-text-secondary)]">
              The application needs a Google Gemini API key to function.
            </p>
            <p className="mt-2 text-[var(--color-text-secondary)]">
              Please open the file <code className="bg-rose-500/20 px-1 py-0.5 rounded text-sm font-mono">services/geminiService.ts</code> in your editor, find the <code className="bg-rose-500/20 px-1 py-0.5 rounded text-sm font-mono">API_KEY</code> constant, and replace the placeholder string with your actual key.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-premium-gradient">
      <Header />
      <main className="flex-grow flex flex-col lg:flex-row p-6 md:p-8 gap-8 animate-fade-in">
        {/* Image viewer is now first for a mobile-first layout */}
        <div className="flex-grow flex items-center justify-center bg-[var(--color-container-primary)] rounded-2xl p-2 sm:p-4 min-h-[50vh] lg:min-h-0 relative overflow-hidden border border-[var(--color-border-primary)]">
          {isLoading ? (
            <Loader message={loadingMessage} />
          ) : error ? (
            <div className="text-center text-[var(--color-error)] p-8 bg-rose-500/10 rounded-lg border border-rose-500/20">
              <h3 className="text-xl font-bold">An Error Occurred</h3>
              <p className="mt-2 text-[var(--color-text-secondary)] max-w-md">{error}</p>
            </div>
          ) : originalImage ? (
            <ImageViewer original={originalImage} enhanced={enhancedImage} />
          ) : (
            <UploadPlaceholder onImageUpload={handleImageUpload} />
          )}
        </div>

        {/* Control panel is now second */}
        <div className="w-full lg:w-[420px] lg:flex-shrink-0 bg-[var(--color-container-secondary)] border border-[var(--color-border-primary)] rounded-2xl shadow-2xl p-6 flex flex-col gap-6 h-fit backdrop-blur-2xl">
          <ControlPanel
            options={enhancementOptions}
            setOptions={setEnhancementOptions}
            onEnhance={handleEnhancement}
            onDownload={handleDownload}
            isProcessing={isLoading}
            hasOriginalImage={!!originalImage}
            hasEnhancedImage={!!enhancedImage}
            onReset={resetImages}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;