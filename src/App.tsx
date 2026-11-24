import { useMemo, useState } from 'react';
import { Download } from 'lucide-react';
import { MarkdownViewer } from './components/MarkdownViewer';
import { ReadmePreview } from './components/ReadmePreview';
import { StudioSidebar } from './components/StudioSidebar';
import { TopBar } from './components/TopBar';
import { DEFAULT_CONFIG, SPIDER_AVATAR_PATH } from './data/defaultConfig';
import { ReadmeConfig, ViewMode } from './types/readme';
import { generateReadmeMarkdown } from './utils/generateMarkdown';
import { generateBannerSvg, generateFooterSvg } from './utils/generateSvgAssets';

function triggerDownload(filename: string, content: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

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
    triggerDownload('README.md', markdown, 'text/markdown;charset=utf-8');
  };

  const handleDownloadBannerSvg = () => {
    triggerDownload('banner.svg', generateBannerSvg(config), 'image/svg+xml;charset=utf-8');
  };

  const handleDownloadFooterSvg = () => {
    triggerDownload('footer.svg', generateFooterSvg(config), 'image/svg+xml;charset=utf-8');
  };

  const handleDownloadAvatar = async () => {
    try {
      const res = await fetch(SPIDER_AVATAR_PATH);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'avatar.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch {
      const link = document.createElement('a');
      link.href = SPIDER_AVATAR_PATH;
      link.download = 'avatar.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
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
          onDownloadBannerSvg={handleDownloadBannerSvg}
          onDownloadFooterSvg={handleDownloadFooterSvg}
          onDownloadAvatar={handleDownloadAvatar}
          isOpenMobile={sidebarOpenMobile}
          onCloseMobile={() => setSidebarOpenMobile(false)}
        />

        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-800/80 bg-[#0D1117] px-4 py-3 text-xs text-slate-400">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-medium text-slate-200">Publish Pack</span>
              <span aria-hidden="true">·</span>
              <span>
                Upload{' '}
                {config.bannerMode === 'repo-svg' && (
                  <>
                    <span className="font-mono text-slate-200">banner.svg</span>,{' '}
                    <span className="font-mono text-slate-200">footer.svg</span>,{' '}
                  </>
                )}
                <span className="font-mono text-slate-200">avatar.jpg</span> &amp; update{' '}
                <span className="font-mono text-blue-400">README.md</span> in{' '}
                <a
                  href={`https://github.com/${config.username}/${config.username}`}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-blue-400 hover:underline"
                >
                  {config.username}/{config.username}
                </a>
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleDownloadAvatar}
                className="inline-flex items-center gap-1.5 rounded-md border border-slate-700 bg-slate-800/70 px-2.5 py-1 text-[11px] font-medium text-slate-200 transition-colors hover:border-slate-600 hover:bg-slate-800 cursor-pointer whitespace-nowrap"
              >
                <Download className="h-3 w-3 text-red-400" />
                <span>avatar.jpg</span>
              </button>
              {config.bannerMode === 'repo-svg' && (
                <>
                  <button
                    type="button"
                    onClick={handleDownloadBannerSvg}
                    className="inline-flex items-center gap-1.5 rounded-md border border-slate-700 bg-slate-800/70 px-2.5 py-1 text-[11px] font-medium text-slate-200 transition-colors hover:border-slate-600 hover:bg-slate-800 cursor-pointer whitespace-nowrap"
                  >
                    <Download className="h-3 w-3 text-blue-400" />
                    <span>banner.svg</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleDownloadFooterSvg}
                    className="inline-flex items-center gap-1.5 rounded-md border border-slate-700 bg-slate-800/70 px-2.5 py-1 text-[11px] font-medium text-slate-200 transition-colors hover:border-slate-600 hover:bg-slate-800 cursor-pointer whitespace-nowrap"
                  >
                    <Download className="h-3 w-3 text-violet-400" />
                    <span>footer.svg</span>
                  </button>
                </>
              )}
            </div>
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
