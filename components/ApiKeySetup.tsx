import React, { useState } from 'react';
import { useApiKey } from '../contexts/ApiKeyContext';
import { KeyIcon } from './icons/KeyIcon';

export const ApiKeySetup: React.FC = () => {
  const [keyInput, setKeyInput] = useState('');
  const { setApiKey } = useApiKey();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyInput.trim()) {
      setApiKey(keyInput.trim());
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-premium-gradient">
        <main className="flex-grow flex items-center justify-center p-6 md:p-8">
            <div className="text-center bg-[var(--color-container-primary)] border border-[var(--color-border-primary)] p-8 sm:p-12 rounded-2xl max-w-2xl w-full shadow-2xl animate-fade-in">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-[var(--color-accent-gradient-from)] to-[var(--color-accent-gradient-to)] rounded-xl flex items-center justify-center shadow-lg mb-6">
                    <KeyIcon className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-text-strong)]">Enter Your Gemini API Key</h2>
                <p className="mt-4 text-[var(--color-text-secondary)]">
                    This application requires a Google Gemini API key to function. Your key is stored securely in your browser's local storage and is never sent to our servers.
                </p>
                <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-3">
                    <input
                        type="password"
                        value={keyInput}
                        onChange={(e) => setKeyInput(e.target.value)}
                        placeholder="Paste your API key here"
                        className="flex-grow bg-white/5 border border-[var(--color-border-secondary)] rounded-lg px-4 py-3 text-[var(--color-text-primary)] focus:ring-2 focus:ring-[var(--color-accent-primary)] focus:outline-none transition-all duration-200"
                        aria-label="Google Gemini API Key"
                    />
                    <button
                        type="submit"
                        disabled={!keyInput.trim()}
                        className="bg-gradient-to-r from-[var(--color-accent-gradient-from)] to-[var(--color-accent-gradient-to)] border border-[var(--color-accent-primary)]/50 hover:opacity-90 disabled:opacity-50 disabled:saturate-50 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_var(--color-accent-glow)] disabled:shadow-none"
                    >
                        Save & Continue
                    </button>
                </form>
                <p className="mt-6 text-xs text-[var(--color-text-secondary)]">
                    Don't have a key? Get one from{" "}
                    <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent-secondary)] hover:underline">
                        Google AI Studio
                    </a>.
                </p>
            </div>
        </main>
    </div>
  );
};