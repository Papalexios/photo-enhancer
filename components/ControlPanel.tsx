import React from 'react';
import { EnhancementOptions } from '../types';
import { SparklesIcon } from './icons/SparklesIcon';
import { ArrowDownTrayIcon } from './icons/ArrowDownTrayIcon';
import { XCircleIcon } from './icons/XCircleIcon';
import { UpscaleIcon } from './icons/UpscaleIcon';
import { NoiseReductionIcon } from './icons/NoiseReductionIcon';
import { FaceDetailIcon } from './icons/FaceDetailIcon';
import { RestoreIcon } from './icons/RestoreIcon';
import { ArrowTrendingUpIcon } from './icons/ArrowTrendingUpIcon';

interface EnhancementOptionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  enabled: boolean;
  onClick: () => void;
  disabled?: boolean;
}

const EnhancementOption: React.FC<EnhancementOptionProps> = ({ icon, title, description, enabled, onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`p-4 w-full text-left rounded-xl border transition-all duration-300 transform hover:-translate-y-0.5 ${
        enabled 
          ? 'bg-[var(--color-accent-subtle)] border-[var(--color-accent-primary)] shadow-[0_0_15px_var(--color-accent-glow)]' 
          : 'bg-black/10 border-[var(--color-border-secondary)] hover:border-[var(--color-accent-secondary)]'
      } ${disabled ? 'opacity-50 cursor-not-allowed saturate-50 hover:transform-none' : ''}`}
    >
      <div className="flex items-start gap-4">
        <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${enabled ? 'bg-gradient-to-br from-[var(--color-accent-gradient-from)] to-[var(--color-accent-gradient-to)] text-white' : 'bg-[var(--color-border-secondary)] text-[var(--color-text-secondary)]'}`}>
            {icon}
        </div>
        <div>
          <h3 className="font-semibold text-[var(--color-text-strong)]">{title}</h3>
          <p className="text-xs text-[var(--color-text-secondary)] mt-1">{description}</p>
        </div>
      </div>
    </button>
  );
};

interface ControlPanelProps {
  options: EnhancementOptions;
  setOptions: React.Dispatch<React.SetStateAction<EnhancementOptions>>;
  onEnhance: (oneTap: boolean) => void;
  onDownload: () => void;
  isProcessing: boolean;
  hasOriginalImage: boolean;
  hasEnhancedImage: boolean;
  onReset: () => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  options,
  setOptions,
  onEnhance,
  onDownload,
  isProcessing,
  hasOriginalImage,
  hasEnhancedImage,
  onReset
}) => {
  const handleOptionChange = (option: keyof EnhancementOptions) => {
    setOptions(prev => ({ ...prev, [option]: !prev[option] }));
  };

  return (
    <div className="flex flex-col space-y-6">
      <a
        href="https://viral-post.affiliatemarketingforsuccess.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="block p-4 rounded-xl bg-[var(--color-accent-subtle)] border border-transparent hover:border-[var(--color-accent-primary)] transition-all duration-300 transform hover:-translate-y-0.5 group shadow-lg hover:shadow-[0_0_20px_var(--color-accent-glow)] aurora-shimmer"
      >
        <div className="flex items-center gap-4">
          <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-[var(--color-accent-gradient-from)] to-[var(--color-accent-gradient-to)] text-white shadow-lg">
            <ArrowTrendingUpIcon className="w-6 h-6" />
          </div>
          <div className="relative z-10">
            <h3 className="font-bold text-[var(--color-text-strong)] group-hover:text-[var(--color-accent-primary)] transition-colors">
              Dominate Your Niche
            </h3>
            <p className="text-sm text-[var(--color-text-secondary)] mt-0.5">
              – Unlock Your Complete AI-Powered SEO Arsenal
            </p>
          </div>
        </div>
      </a>
      
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-text-strong)] tracking-tight">Enhance Image</h2>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">
          Select enhancements or create an instant masterpiece.
        </p>
      </div>

      <button
        onClick={() => onEnhance(true)}
        disabled={isProcessing || !hasOriginalImage}
        className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-[var(--color-accent-gradient-from)] to-[var(--color-accent-gradient-to)] border border-[var(--color-accent-primary)]/50 hover:opacity-90 disabled:from-[var(--color-disabled-bg)] disabled:to-gray-200/[var(--color-disabled-bg)] disabled:border-[var(--color-border-secondary)] disabled:text-[var(--color-disabled-fg)] disabled:cursor-not-allowed disabled:saturate-50 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-[1.03] shadow-[0_0_20px_var(--color-accent-glow)] disabled:shadow-none"
      >
        <SparklesIcon className="w-6 h-6" />
        Instant Masterpiece
      </button>

      <div className="border-t border-[var(--color-border-primary)]"></div>
      
      <div>
        <h3 className="text-lg font-semibold text-[var(--color-text-strong)] mb-4">Fine-Tune Controls</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <EnhancementOption 
            icon={<UpscaleIcon className="w-5 h-5"/>}
            title="Upscale Resolution"
            description="Increase image size and clarity."
            enabled={options.upscale}
            onClick={() => handleOptionChange('upscale')}
            disabled={isProcessing || !hasOriginalImage || options.oldPhotoRestore}
          />
          <EnhancementOption 
            icon={<NoiseReductionIcon className="w-5 h-5"/>}
            title="Reduce Noise"
            description="Clean up grain and artifacts."
            enabled={options.noiseReduction}
            onClick={() => handleOptionChange('noiseReduction')}
            disabled={isProcessing || !hasOriginalImage || options.oldPhotoRestore}
          />
          <EnhancementOption 
            icon={<FaceDetailIcon className="w-5 h-5"/>}
            title="Optimize Face Details"
            description="Enhance facial features with realism."
            enabled={options.faceDetail}
            onClick={() => handleOptionChange('faceDetail')}
            disabled={isProcessing || !hasOriginalImage || options.oldPhotoRestore}
          />
        </div>
      </div>

      <div className="border-t border-[var(--color-border-primary)]"></div>

      <div>
        <EnhancementOption 
            icon={<RestoreIcon className="w-5 h-5"/>}
            title="Museum-Grade Restoration"
            description="Repair vintage photos. Overrides other settings."
            enabled={options.oldPhotoRestore}
            onClick={() => handleOptionChange('oldPhotoRestore')}
            disabled={isProcessing || !hasOriginalImage}
        />
      </div>

       <div className="border-t border-[var(--color-border-primary)] pt-6 space-y-3">
        {hasEnhancedImage && (
            <button
            onClick={onDownload}
            disabled={isProcessing}
            className="w-full flex items-center justify-center gap-2 bg-[var(--color-success)] hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-xl transition-all duration-200"
            >
            <ArrowDownTrayIcon className="w-5 h-5" />
            Download Result
            </button>
        )}
        {hasOriginalImage && (
             <button
             onClick={onReset}
             disabled={isProcessing}
             className="w-full flex items-center justify-center gap-2 bg-[var(--color-button-secondary)] hover:bg-[var(--color-button-secondary-hover)] disabled:opacity-50 disabled:cursor-not-allowed text-[var(--color-text-primary)] font-semibold py-2 px-4 rounded-xl transition-colors duration-200"
           >
             <XCircleIcon className="w-5 h-5" />
             Start Over
           </button>
        )}
       </div>

    </div>
  );
};