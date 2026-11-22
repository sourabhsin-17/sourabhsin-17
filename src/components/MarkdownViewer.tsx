import { Check, Copy, Download, FileCode2 } from 'lucide-react';

interface MarkdownViewerProps {
  markdown: string;
  onCopy: () => void;
  onDownload: () => void;
  copied: boolean;
}

export function MarkdownViewer({
  markdown,
  onCopy,
  onDownload,
  copied,
}: MarkdownViewerProps) {
  const lines = markdown.split('\n');

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-slate-800/90 bg-[#0D1117]">
      {/* File Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/90 bg-[#161B22] px-4 py-3">
        <div className="flex items-center gap-2.5 text-xs text-slate-300">
          <FileCode2 className="h-4 w-4 text-blue-400" />
          <span className="font-mono font-medium text-slate-100">README.md</span>
          <span className="text-slate-600" aria-hidden="true">·</span>
          <span className="font-mono tabular-nums text-slate-400">
            {lines.length} lines
          </span>
          <span className="text-slate-600" aria-hidden="true">·</span>
          <span className="font-mono tabular-nums text-slate-400">
            {markdown.length} chars
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onDownload}
            className="inline-flex items-center gap-1.5 rounded-md border border-slate-700 bg-slate-800/70 px-3 py-1.5 text-xs font-medium text-slate-200 transition-colors hover:border-slate-600 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Download .md</span>
          </button>
          <button
            type="button"
            onClick={onCopy}
            className="inline-flex items-center gap-1.5 rounded-md border border-blue-500/40 bg-blue-600/20 px-3 py-1.5 text-xs font-medium text-blue-200 transition-colors hover:bg-blue-600/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 whitespace-nowrap shrink-0 cursor-pointer"
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copied ? 'Copied' : 'Copy Raw'}</span>
          </button>
        </div>
      </div>

      {/* Code Lines */}
      <div className="max-h-[calc(100vh-11rem)] overflow-auto p-4 font-mono text-[13px] leading-6">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, idx) => (
              <tr key={idx} className="hover:bg-slate-800/30">
                <td className="w-10 select-none pr-4 text-right align-top font-mono tabular-nums text-slate-600">
                  {idx + 1}
                </td>
                <td className="whitespace-pre-wrap break-all text-slate-200">
                  {line || ' '}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
