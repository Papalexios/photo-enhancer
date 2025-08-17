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
      <main className="flex-grow flex flex-col lg:flex-row p-4 sm:p-6 lg:p-8 gap-8 animate-fade-in">
        <div className="w-full lg:w-[420px] lg:flex-shrink-0 bg-black/30 border border-white/10 rounded-2xl shadow-2xl p-6 flex flex-col gap-6 h-fit backdrop-blur-2xl">
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

        <div className="flex-grow flex items-center justify-center bg-black/20 rounded-2xl p-4 min-h-[50vh] lg:min-h-0 relative overflow-hidden border border-white/10">
          {isLoading ? (
            <Loader message={loadingMessage} />
          ) : error ? (
            <div className="text-center text-red-400 p-8 bg-red-900/20 rounded-lg">
              <h3 className="text-xl font-bold">An Error Occurred</h3>
              <p className="mt-2 text-gray-300 max-w-md">{error}</p>
            </div>
          ) : originalImage ? (
            <ImageViewer original={originalImage} enhanced={enhancedImage} />
          ) : (
            <UploadPlaceholder onImageUpload={handleImageUpload} />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;