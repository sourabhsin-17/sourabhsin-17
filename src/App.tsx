import { useMemo, useState } from 'react';
import { MarkdownViewer } from './components/MarkdownViewer';
import { ReadmePreview } from './components/ReadmePreview';
import { StudioSidebar } from './components/StudioSidebar';
import { TopBar } from './components/TopBar';
import { DEFAULT_CONFIG } from './data/defaultConfig';
import { ReadmeConfig, ViewMode } from './types/readme';
import { generateReadmeMarkdown } from './utils/generateMarkdown';

export default function App() {
  const [config, setConfig] = useState<ReadmeConfig>(DEFAULT_CONFIG);
  const [viewMode, setViewMode] = useState<ViewMode>('preview');
  const [copied, setCopied] = useState(false);
  const [sidebarOpenMobile, setSidebarOpenMobile] = useState(false);

  const markdown = useMemo(() => generateReadmeMarkdown(config), [config]);

  const handleCopyMarkdown = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = markdown;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadMarkdown = () => {
    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'README.md';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setConfig(DEFAULT_CONFIG);
  };

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100">
      <TopBar
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onCopyMarkdown={handleCopyMarkdown}
        copied={copied}
        onToggleSidebar={() => setSidebarOpenMobile(true)}
      />

      <div className="mx-auto flex max-w-[1600px]">
        <StudioSidebar
          config={config}
          onChange={setConfig}
          onReset={handleReset}
          onDownload={handleDownloadMarkdown}
          isOpenMobile={sidebarOpenMobile}
          onCloseMobile={() => setSidebarOpenMobile(false)}
        />

        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-medium text-slate-200">GitHub Profile README</span>
              <span aria-hidden="true">·</span>
              <span>
                Publish to{' '}
                <a
                  href={`https://github.com/${config.username}`}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-blue-400 hover:underline"
                >
                  github.com/{config.username}/{config.username}
                </a>
              </span>
            </div>
            <span className="font-mono text-[11px] text-slate-500">
              Dark Blue & Purple Theme
            </span>
          </div>

          {viewMode === 'preview' && (
            <div className="mx-auto max-w-[980px]">
              <ReadmePreview config={config} onDownload={handleDownloadMarkdown} />
            </div>
          )}

          {viewMode === 'markdown' && (
            <div className="mx-auto max-w-[980px]">
              <MarkdownViewer
                markdown={markdown}
                onCopy={handleCopyMarkdown}
                onDownload={handleDownloadMarkdown}
                copied={copied}
              />
            </div>
          )}

          {viewMode === 'split' && (
            <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-12">
              <div className="xl:col-span-7">
                <ReadmePreview config={config} onDownload={handleDownloadMarkdown} />
              </div>
              <div className="xl:sticky xl:top-20 xl:col-span-5">
                <MarkdownViewer
                  markdown={markdown}
                  onCopy={handleCopyMarkdown}
                  onDownload={handleDownloadMarkdown}
                  copied={copied}
                />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
