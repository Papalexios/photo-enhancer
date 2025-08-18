import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

export const Header: React.FC = () => {
  return (
    <header className="w-full bg-slate-950/70 backdrop-blur-xl border-b border-slate-800 sticky top-0 z-20">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
              <SparklesIcon className="w-5 h-5 text-white" />
            </div>
            <div className="flex items-baseline gap-2">
                <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-100">
                Photo AI Enhancer
                </h1>
                <span className="hidden md:inline text-xs text-slate-400">by affiliatemarketingforsuccess.com</span>
            </div>
          </div>
          <div>
            <a 
                href="https://affiliatemarketingforsuccess.com/blog/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-slate-300 hover:text-violet-400 transition-colors duration-200"
            >
                Read Our Blog
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};