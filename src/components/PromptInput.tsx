import { useState } from 'react';

interface PromptInputProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

const examplePrompts = [
  'A majestic dragon flying over a crystal castle at sunset',
  'Cyberpunk city street with neon lights reflecting on wet pavement',
  'A serene Japanese garden with cherry blossoms and a koi pond',
  'An astronaut riding a horse on Mars, photorealistic',
  'A magical forest with glowing mushrooms and fireflies',
  'A steampunk airship flying through golden clouds',
  'Portrait of a wise old wizard with a long silver beard',
  'Underwater coral reef with tropical fish, ultra detailed',
];

export default function PromptInput({ prompt, setPrompt, onGenerate, isGenerating }: PromptInputProps) {
  const [showExamples, setShowExamples] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onGenerate();
    }
  };

  return (
    <div className="glass-card rounded-2xl p-6 animate-fade-in-up">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
          Describe Your Image
        </h3>
        <button
          onClick={() => setShowExamples(!showExamples)}
          className="text-sm text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          {showExamples ? 'Hide' : 'Show'} Examples
        </button>
      </div>

      {showExamples && (
        <div className="mb-4 flex flex-wrap gap-2">
          {examplePrompts.map((example) => (
            <button
              key={example}
              onClick={() => setPrompt(example)}
              className="px-3 py-1.5 rounded-lg bg-purple-600/20 border border-purple-500/30 text-sm text-purple-300 hover:bg-purple-600/30 transition-all truncate max-w-[250px]"
            >
              {example}
            </button>
          ))}
        </div>
      )}

      <div className="relative">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Describe the image you want to create... (e.g., 'A beautiful sunset over mountains with a lake reflection')"
          className="w-full h-32 px-4 py-3 rounded-xl bg-[#0d0d2b] border border-purple-500/30 text-white placeholder-gray-500 resize-none focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
        />
        <div className="absolute bottom-3 right-3 text-xs text-gray-500">
          {prompt.length} characters
        </div>
      </div>

      <div className="mt-4 flex flex-col sm:flex-row gap-3">
        <button
          onClick={onGenerate}
          disabled={!prompt.trim() || isGenerating}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold hover:from-purple-500 hover:to-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-purple-500/20"
        >
          {isGenerating ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Generating...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Generate Image
            </>
          )}
        </button>
        
        <button
          onClick={() => setPrompt('')}
          disabled={!prompt || isGenerating}
          className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
