import React from 'react';

interface LoaderProps {
  message: string;
}

export const Loader: React.FC<LoaderProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8" aria-live="polite">
      <div className="relative flex items-center justify-center w-32 h-32 aurora-shimmer rounded-full">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent-primary)]/20 to-[var(--color-accent-gradient-to)]/20 rounded-full blur-xl"></div>
         <svg className="w-12 h-12 text-[var(--color-accent-secondary)] animate-pulse" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.75 19.25l5.5-5.5m-5.5-5.5h5.5v5.5m5.5-5.5l5.5 5.5m-5.5 5.5h5.5v-5.5"></path>
        </svg>
      </div>
      <h3 className="mt-8 text-2xl font-bold text-[var(--color-text-strong)] tracking-wide">Conjuring Masterpiece...</h3>
      <p className="mt-2 text-[var(--color-text-secondary)] animate-pulse min-h-[1.25rem]">{message}</p>
    </div>
  );
};