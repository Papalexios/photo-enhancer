import React, { useCallback, useState } from 'react';
import { PhotoIcon } from './icons/PhotoIcon';

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
    <div
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={`relative w-full max-w-2xl h-full flex flex-col items-center justify-center text-center p-8 rounded-2xl transition-all duration-300 group ${isDragging ? 'scale-105' : 'hover:scale-[1.02]'}`}
    >
      <div className={`absolute inset-0 border-2 border-dashed rounded-2xl transition-all duration-300 ${isDragging ? 'border-violet-500 bg-violet-500/10' : 'border-white/20 group-hover:border-white/40'}`}></div>
      
      <div className="relative z-10">
        <PhotoIcon className={`w-24 h-24 text-gray-500 transition-all duration-300 ${isDragging ? 'scale-110 text-violet-400' : 'group-hover:text-gray-400'}`} />
        <h3 className="mt-4 text-2xl font-bold text-white">Upload Your Photo</h3>
        <p className="mt-2 text-gray-400">Drag & drop an image here or click the button below.</p>
        <button
          onClick={openFileDialog}
          className="mt-6 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
        >
          Select Image from Device
        </button>
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
