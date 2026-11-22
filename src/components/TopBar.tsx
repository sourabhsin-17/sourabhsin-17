import { Check, Copy, SlidersHorizontal } from 'lucide-react';
import { ViewMode } from '../types/readme';

interface TopBarProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onCopyMarkdown: () => void;
  copied: boolean;
  onToggleSidebar: () => void;
}

export function TopBar({
  viewMode,
  onViewModeChange,
  onCopyMarkdown,
  copied,
  onToggleSidebar,
}: TopBarProps) {
  return (
    <header className="sticky top-0 z-30 h-14 border-b border-slate-800/80 bg-[#090D16]/95 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-[1600px] items-center justify-between gap-8 px-4 sm:px-6">
        {/* Zone 1: Single-line Brand Wordmark (+ mobile drawer trigger) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onToggleSidebar}
            aria-label="Toggle configuration panel"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-900/70 text-slate-300 transition-colors hover:border-slate-700 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 lg:hidden"
          >
            <SlidersHorizontal className="h-4 w-4" />
          </button>
          <span className="font-display text-base font-bold tracking-tight text-slate-100 whitespace-nowrap shrink-0">
            Sourabh Singh
          </span>
        </div>

        {/* Zone 2: Clean single-line view switcher */}
        <nav aria-label="Workspace views" className="flex items-center gap-1 rounded-lg border border-slate-800/90 bg-[#0D1117] p-1">
          <button
            type="button"
            onClick={() => onViewModeChange('preview')}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
              viewMode === 'preview'
                ? 'bg-blue-600/20 text-blue-300'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Live Preview
          </button>
          <button
            type="button"
            onClick={() => onViewModeChange('markdown')}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
              viewMode === 'markdown'
                ? 'bg-blue-600/20 text-blue-300'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Markdown
          </button>
          <button
            type="button"
            onClick={() => onViewModeChange('split')}
            className={`hidden md:inline-flex rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
              viewMode === 'split'
                ? 'bg-blue-600/20 text-blue-300'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Split View
          </button>
        </nav>

        {/* Zone 3: Primary CTA */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onCopyMarkdown}
            className="inline-flex h-9 items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 px-4 py-2 text-xs font-semibold text-white transition-all duration-150 hover:from-blue-500 hover:to-violet-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 whitespace-nowrap shrink-0 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5" />
                <span>Copied README.md</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy README.md</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
