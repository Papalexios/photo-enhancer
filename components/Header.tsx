import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';
import { ThemeSwitcher } from './ThemeSwitcher';
import { KeyIcon } from './icons/KeyIcon';
import { useApiKey } from '../contexts/ApiKeyContext';


export const Header: React.FC = () => {
    const { clearApiKey } = useApiKey();

  return (
    <header className="w-full bg-[var(--color-header)] backdrop-blur-xl border-b border-[var(--color-border-primary)] sticky top-0 z-20">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-[var(--color-accent-gradient-from)] to-[var(--color-accent-gradient-to)] rounded-lg flex items-center justify-center shadow-lg">
              <SparklesIcon className="w-5 h-5 text-white" />
            </div>
            <div className="flex items-baseline gap-2">
                <h1 className="text-lg sm:text-xl font-bold tracking-tight text-[var(--color-text-strong)]">
                Photo AI Enhancer
                </h1>
                <span className="hidden md:inline text-xs text-[var(--color-text-secondary)]">by affiliatemarketingforsuccess.com</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a 
                href="https://affiliatemarketingforsuccess.com/blog/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-[var(--color-text-primary)] hover:text-[var(--color-accent-secondary)] transition-colors duration-200"
            >
                Read Our Blog
            </a>
            <button
                onClick={clearApiKey}
                className="w-9 h-9 flex items-center justify-center rounded-lg text-[var(--color-text-secondary)] hover:bg-[var(--color-button-secondary)] hover:text-[var(--color-text-primary)] transition-all duration-200"
                aria-label="Reset API Key"
                title="Reset API Key"
            >
                <KeyIcon className="w-5 h-5" />
            </button>
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
};