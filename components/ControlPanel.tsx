import React from 'react';
import { EnhancementOptions } from '../types';
import { SparklesIcon } from './icons/SparklesIcon';
import { ArrowDownTrayIcon } from './icons/ArrowDownTrayIcon';
import { XCircleIcon } from './icons/XCircleIcon';
import { UpscaleIcon } from './icons/UpscaleIcon';
import { NoiseReductionIcon } from './icons/NoiseReductionIcon';
import { FaceDetailIcon } from './icons/FaceDetailIcon';
import { RestoreIcon } from './icons/RestoreIcon';

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
          ? 'bg-violet-900/30 border-violet-500 shadow-[0_0_15px_rgba(139,92,246,0.2)]' 
          : 'bg-slate-900/70 border-slate-700 hover:border-slate-500'
      } ${disabled ? 'opacity-50 cursor-not-allowed saturate-50 hover:transform-none' : ''}`}
    >
      <div className="flex items-start gap-4">
        <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${enabled ? 'bg-gradient-to-br from-violet-500 to-purple-500 text-white' : 'bg-slate-700 text-slate-300'}`}>
            {icon}
        </div>
        <div>
          <h3 className="font-semibold text-slate-100">{title}</h3>
          <p className="text-xs text-slate-400 mt-1">{description}</p>
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
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight">Enhance Image</h2>
        <p className="text-sm text-slate-400 mt-1">
          Select enhancements or create an instant masterpiece.
        </p>
      </div>

      <button
        onClick={() => onEnhance(true)}
        disabled={isProcessing || !hasOriginalImage}
        className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-violet-600 to-purple-600 border border-violet-400/50 hover:from-violet-500 hover:to-purple-500 disabled:from-slate-700 disabled:to-slate-800 disabled:border-slate-600 disabled:cursor-not-allowed disabled:saturate-50 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-[1.03] shadow-[0_0_20px_rgba(139,92,246,0.3)] disabled:shadow-none"
      >
        <SparklesIcon className="w-6 h-6" />
        Instant Masterpiece
      </button>

      <div className="border-t border-slate-800"></div>
      
      <div>
        <h3 className="text-lg font-semibold text-slate-100 mb-4">Fine-Tune Controls</h3>
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

      <div className="border-t border-slate-800"></div>

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

       <div className="border-t border-slate-800 pt-6 space-y-3">
        {hasEnhancedImage && (
            <button
            onClick={onDownload}
            disabled={isProcessing}
            className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-800/50 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-xl transition-all duration-200"
            >
            <ArrowDownTrayIcon className="w-5 h-5" />
            Download Result
            </button>
        )}
        {hasOriginalImage && (
             <button
             onClick={onReset}
             disabled={isProcessing}
             className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 disabled:bg-slate-800/50 disabled:cursor-not-allowed text-slate-200 font-semibold py-2 px-4 rounded-xl transition-colors duration-200"
           >
             <XCircleIcon className="w-5 h-5" />
             Start Over
           </button>
        )}
       </div>

    </div>
  );
};