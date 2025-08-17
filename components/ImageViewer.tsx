import React, { useState, useRef } from 'react';

interface ImageViewerProps {
  original: string;
  enhanced: string | null;
}

export const ImageViewer: React.FC<ImageViewerProps> = ({ original, enhanced }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = ('touches' in e ? e.touches[0].clientX : e.clientX) - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  }

  const handleMoveWrapper = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.buttons !== 1) return;
    handleMove(e);
  };

  const handleTouchMoveWrapper = (e: React.TouchEvent<HTMLDivElement>) => {
    handleMove(e);
  };
  
  if (!enhanced) {
    return (
      <div className="w-full h-full flex items-center justify-center p-4">
        <img src={original} alt="Original" className="max-w-full max-h-full object-contain rounded-lg shadow-2xl" />
      </div>
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
        <div 
            ref={imageContainerRef}
            className="relative w-full h-full cursor-ew-resize select-none group"
            onMouseMove={handleMoveWrapper}
            onTouchMove={handleTouchMoveWrapper}
        >
            <img 
              src={original} 
              alt="" 
              aria-hidden="true" 
              className="w-full h-full object-contain pointer-events-none invisible" 
            />

            <div className="absolute top-0 left-0 w-full h-full">
                <img 
                    src={original} 
                    alt="Original" 
                    className="absolute top-0 left-0 w-full h-full object-contain rounded-lg pointer-events-none" 
                />
                <div
                    className="absolute top-0 left-0 w-full h-full object-contain overflow-hidden pointer-events-none"
                    style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                >
                    <img src={enhanced} alt="Enhanced" className="w-full h-full object-contain rounded-lg" />
                </div>
                
                <div
                    className="absolute top-0 h-full w-0.5 bg-white/50 backdrop-blur-sm pointer-events-none transition-shadow duration-200 group-hover:shadow-[0_0_15px_2px_rgba(255,255,255,0.7)]"
                    style={{ left: `${sliderPosition}%` }}
                >
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white/90 rounded-full h-10 w-10 flex items-center justify-center shadow-2xl ring-4 ring-gray-900/50 backdrop-blur-sm">
                        <div className="w-1 h-5 bg-gray-700/60 rounded-full"></div>
                        <div className="w-1 h-5 bg-gray-700/60 rounded-full mx-0.5"></div>
                        <div className="w-1 h-5 bg-gray-700/60 rounded-full"></div>
                    </div>
                </div>

                <div className="absolute bottom-2 left-2 px-2 py-1 text-xs font-bold text-white uppercase bg-black/50 rounded-md pointer-events-none">Before</div>
                <div className="absolute bottom-2 right-2 px-2 py-1 text-xs font-bold text-white uppercase bg-black/50 rounded-md pointer-events-none" style={{ opacity: sliderPosition > 5 ? 1 : 0}}>After</div>
            </div>
        </div>
    </div>
  );
};