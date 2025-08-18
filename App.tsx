import React from 'react';
import { Header } from './components/Header';
import { ControlPanel } from './components/ControlPanel';
import { ImageViewer } from './components/ImageViewer';
import { UploadPlaceholder } from './components/UploadPlaceholder';
import { Loader } from './components/Loader';
import { useImageEnhancer } from './hooks/useImageEnhancer';
import { EnhancementOptions } from './types';

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

  return (
    <div className="min-h-screen flex flex-col bg-premium-gradient">
      <Header />
      <main className="flex-grow flex flex-col lg:flex-row p-6 md:p-8 gap-8 animate-fade-in">
        {/* Image viewer is now first for a mobile-first layout */}
        <div className="flex-grow flex items-center justify-center bg-slate-900/50 rounded-2xl p-2 sm:p-4 min-h-[50vh] lg:min-h-0 relative overflow-hidden border border-slate-800">
          {isLoading ? (
            <Loader message={loadingMessage} />
          ) : error ? (
            <div className="text-center text-red-400 p-8 bg-red-900/30 rounded-lg border border-red-700/50">
              <h3 className="text-xl font-bold">An Error Occurred</h3>
              <p className="mt-2 text-slate-300 max-w-md">{error}</p>
            </div>
          ) : originalImage ? (
            <ImageViewer original={originalImage} enhanced={enhancedImage} />
          ) : (
            <UploadPlaceholder onImageUpload={handleImageUpload} />
          )}
        </div>

        {/* Control panel is now second */}
        <div className="w-full lg:w-[420px] lg:flex-shrink-0 bg-slate-900/60 border border-slate-800 rounded-2xl shadow-2xl p-6 flex flex-col gap-6 h-fit backdrop-blur-2xl">
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
    </div>
  );
}

export default App;