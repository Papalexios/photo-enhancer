import React, { useCallback, useState } from 'react';
import { DualAiIcon } from './icons/DualAiIcon';
import { WandIcon } from './icons/WandIcon';
import { CameraHeartIcon } from './icons/CameraHeartIcon';

interface UploadPlaceholderProps {
  onImageUpload: (file: File) => void;
}

export const UploadPlaceholder: React.FC<UploadPlaceholderProps> = ({ onImageUpload }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onImageUpload(e.dataTransfer.files[0]);
    }
  }, [onImageUpload]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onImageUpload(e.target.files[0]);
    }
  };

  const openFileDialog = () => {
    document.getElementById('file-upload-input')?.click();
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-start p-4 sm:p-8 text-center animate-fade-in overflow-y-auto">
      <div className="w-full max-w-5xl">
        {/* Main Title & USP */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--color-text-strong)] tracking-tight">
          What makes this offer so special?
        </h2>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-[var(--color-text-secondary)]">
          Go beyond simple filters. Our exclusive Dual-AI process analyzes your photo's core subject, then meticulously reconstructs it for professional, hyper-realistic results competitors can't match.
        </p>

        {/* Features Section */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-10">
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-[var(--color-accent-subtle)] text-[var(--color-accent-primary)]">
              <DualAiIcon className="w-7 h-7" />
            </div>
            <h3 className="mt-4 font-semibold text-[var(--color-text-strong)]">Exclusive Dual-AI Engine</h3>
            <p className="mt-1 text-sm text-[var(--color-text-secondary)]">Unlike others, our AI first understands *what* it's seeing, then enhances it for true-to-life results.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-[var(--color-accent-subtle)] text-[var(--color-accent-primary)]">
              <WandIcon className="w-7 h-7" />
            </div>
            <h3 className="mt-4 font-semibold text-[var(--color-text-strong)]">Museum-Grade Restoration</h3>
            <p className="mt-1 text-sm text-[var(--color-text-secondary)]">We don't just blur imperfections; we intelligently repair scratches, tears, and fading with precision.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-[var(--color-accent-subtle)] text-[var(--color-accent-primary)]">
              <CameraHeartIcon className="w-7 h-7" />
            </div>
            <h3 className="mt-4 font-semibold text-[var(--color-text-strong)]">Absolute Fidelity Lock</h3>
            <p className="mt-1 text-sm text-[var(--color-text-secondary)]">Our industry-leading promise: enhance detail without altering the soul or likeness of your original photo.</p>
          </div>
        </div>

        {/* Social Proof */}
        <div className="mt-12 max-w-2xl mx-auto">
          <blockquote className="p-4 italic border-l-4 border-[var(--color-border-secondary)] text-[var(--color-text-secondary)]">
            <p>"I've tried every photo enhancer out there... they all made my old photos look like plastic cartoons. This is the only tool that brought them back to life with stunning, realistic detail."</p>
          </blockquote>
          <cite className="block mt-2 text-sm font-semibold text-right text-[var(--color-text-primary)] not-italic">- A Happy User</cite>
        </div>
      </div>

      {/* Upload Area */}
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`relative w-full max-w-2xl mt-12 p-8 rounded-2xl transition-all duration-300 group`}
      >
        <div className={`absolute inset-0 border-2 border-dashed rounded-2xl transition-all duration-300 ${isDragging ? 'border-[var(--color-accent-primary)] bg-[var(--color-accent-subtle)] scale-105' : 'border-[var(--color-border-secondary)] group-hover:border-[var(--color-border-secondary)]'}`}></div>

        <div className="relative z-10">
          <p className="text-lg font-semibold text-[var(--color-text-primary)]">Ready to see the magic?</p>
          <p className="mt-1 text-[var(--color-text-secondary)]">Drag & drop your image here or click the button below.</p>
          <button
            onClick={openFileDialog}
            className="mt-6 bg-gradient-to-r from-[var(--color-accent-gradient-from)] to-[var(--color-accent-gradient-to)] border border-[var(--color-accent-primary)]/50 hover:opacity-90 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg shadow-purple-600/20"
          >
            Select Image from Device
          </button>
        </div>
      </div>

      <input
        type="file"
        id="file-upload-input"
        className="hidden"
        onChange={handleFileChange}
        accept="image/png, image/jpeg, image/webp"
      />
    </div>
  );
};
