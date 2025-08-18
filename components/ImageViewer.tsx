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
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white/90 rounded-full h-10 w-10 flex items-center justify-center gap-1 shadow-2xl ring-4 ring-[var(--color-background)]/50 backdrop-blur-sm cursor-ew-resize">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3 h-3 text-slate-600"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3 h-3 text-slate-600"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                    </div>
                </div>

                <div className="absolute bottom-2 left-2 px-2 py-1 text-xs font-bold text-[var(--color-text-inverted)] uppercase bg-[var(--color-background)]/60 backdrop-blur-sm rounded-md pointer-events-none">Before</div>
                <div className="absolute bottom-2 right-2 px-2 py-1 text-xs font-bold text-[var(--color-text-inverted)] uppercase bg-[var(--color-background)]/60 backdrop-blur-sm rounded-md pointer-events-none" style={{ opacity: sliderPosition > 5 ? 1 : 0}}>After</div>
            </div>
        </div>
    </div>
  );
};