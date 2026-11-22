import { Download, RotateCcw, X } from 'lucide-react';
import { THEME_PRESETS } from '../data/defaultConfig';
import {
  AccentThemeId,
  ProjectLayout,
  ReadmeConfig,
  ReadmeSections,
  TechStyle,
} from '../types/readme';

interface StudioSidebarProps {
  config: ReadmeConfig;
  onChange: (next: ReadmeConfig) => void;
  onReset: () => void;
  onDownload: () => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

const SECTION_LABELS: { key: keyof ReadmeSections; label: string }[] = [
  { key: 'banner', label: 'Animated Wave Banner' },
  { key: 'typing', label: 'Typing Introduction' },
  { key: 'about', label: 'About Me' },
  { key: 'techStack', label: 'Technologies & Tools' },
  { key: 'projects', label: 'Featured Projects' },
  { key: 'stats', label: 'Contribution Stats' },
  { key: 'languages', label: 'Most-Used Languages' },
  { key: 'streak', label: 'Streak Statistics' },
  { key: 'connect', label: 'Social & Contact' },
  { key: 'footer', label: 'Thank-You Footer' },
];

export function StudioSidebar({
  config,
  onChange,
  onReset,
  onDownload,
  isOpenMobile,
  onCloseMobile,
}: StudioSidebarProps) {
  const toggleSection = (key: keyof ReadmeSections) => {
    onChange({
      ...config,
      sections: {
        ...config.sections,
        [key]: !config.sections[key],
      },
    });
  };

  const updateProjectUrl = (id: string, repoUrl: string) => {
    onChange({
      ...config,
      projects: config.projects.map((p) => (p.id === id ? { ...p, repoUrl } : p)),
    });
  };

  const updateTypingLines = (value: string) => {
    onChange({
      ...config,
      typingLines: value.split('\n'),
    });
  };

  const content = (
    <div className="flex h-full flex-col bg-[#0C111D] text-slate-200">
      <div className="flex items-center justify-between border-b border-slate-800/80 px-5 py-4 lg:hidden">
        <span className="font-display text-sm font-semibold text-slate-100">
          Customize README
        </span>
        <button
          type="button"
          onClick={onCloseMobile}
          aria-label="Close configuration panel"
          className="rounded-md p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="flex-1 space-y-7 overflow-y-auto px-5 py-5">
        {/* Accent Palette */}
        <section className="space-y-3">
          <h2 className="font-display text-xs font-semibold tracking-wide text-slate-300">
            Accent Palette
          </h2>
          <div className="grid grid-cols-1 gap-2">
            {(Object.keys(THEME_PRESETS) as AccentThemeId[]).map((id) => {
              const preset = THEME_PRESETS[id];
              const active = config.themeId === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => onChange({ ...config, themeId: id })}
                  className={`flex items-center justify-between rounded-lg border px-3 py-2.5 text-left text-xs font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                    active
                      ? 'border-blue-500/60 bg-blue-500/10 text-slate-100'
                      : 'border-slate-800 bg-[#090D16] text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <span className="whitespace-nowrap">{preset.name}</span>
                  <span className="flex items-center gap-1.5">
                    <span
                      className="h-3 w-3 rounded-sm"
                      style={{ backgroundColor: `#${preset.primaryHex}` }}
                    />
                    <span
                      className="h-3 w-3 rounded-sm"
                      style={{ backgroundColor: `#${preset.secondaryHex}` }}
                    />
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Layout Styles */}
        <section className="space-y-3 border-t border-slate-800/70 pt-5">
          <h2 className="font-display text-xs font-semibold tracking-wide text-slate-300">
            Layout Options
          </h2>

          <div className="space-y-2">
            <label className="block text-[11px] text-slate-400">
              Tech Stack Display
            </label>
            <div className="grid grid-cols-2 gap-1 rounded-lg border border-slate-800 bg-[#090D16] p-1">
              {(
                [
                  { value: 'shields', label: 'Badges' },
                  { value: 'skillicons', label: 'Icon Grid' },
                ] as { value: TechStyle; label: string }[]
              ).map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => onChange({ ...config, techStyle: opt.value })}
                  className={`rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    config.techStyle === opt.value
                      ? 'bg-slate-800 text-slate-100'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-[11px] text-slate-400">
              Projects Layout
            </label>
            <div className="grid grid-cols-2 gap-1 rounded-lg border border-slate-800 bg-[#090D16] p-1">
              {(
                [
                  { value: 'grid', label: 'Table Grid' },
                  { value: 'stacked', label: 'Stacked' },
                ] as { value: ProjectLayout; label: string }[]
              ).map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => onChange({ ...config, projectLayout: opt.value })}
                  className={`rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    config.projectLayout === opt.value
                      ? 'bg-slate-800 text-slate-100'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Sections Visibility */}
        <section className="space-y-3 border-t border-slate-800/70 pt-5">
          <h2 className="font-display text-xs font-semibold tracking-wide text-slate-300">
            Included Sections
          </h2>
          <div className="space-y-1.5">
            {SECTION_LABELS.map(({ key, label }) => (
              <label
                key={key}
                className="flex cursor-pointer items-center justify-between rounded-md px-2 py-1.5 text-xs text-slate-300 transition-colors hover:bg-slate-800/50"
              >
                <span>{label}</span>
                <input
                  type="checkbox"
                  checked={config.sections[key]}
                  onChange={() => toggleSection(key)}
                  className="h-3.5 w-3.5 rounded border-slate-700 bg-slate-900 accent-blue-500"
                />
              </label>
            ))}
          </div>
        </section>

        {/* Project Repo Links */}
        <section className="space-y-3 border-t border-slate-800/70 pt-5">
          <div className="space-y-1">
            <h2 className="font-display text-xs font-semibold tracking-wide text-slate-300">
              Project Repository URLs
            </h2>
            <p className="text-[11px] leading-relaxed text-slate-400">
              Links are omitted by default. Add your real GitHub repository URLs when available.
            </p>
          </div>
          <div className="space-y-2.5">
            {config.projects.map((project) => (
              <div key={project.id} className="space-y-1">
                <label
                  htmlFor={`repo-${project.id}`}
                  className="block text-[11px] font-medium text-slate-300"
                >
                  {project.name}
                </label>
                <input
                  id={`repo-${project.id}`}
                  type="url"
                  value={project.repoUrl}
                  onChange={(e) => updateProjectUrl(project.id, e.target.value)}
                  placeholder={`https://github.com/${config.username}/${project.id}`}
                  className="w-full rounded-md border border-slate-800 bg-[#090D16] px-2.5 py-1.5 font-mono text-[11px] text-slate-200 placeholder:text-slate-600 focus:border-blue-500 focus:outline-none"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Typing Lines & Contact */}
        <section className="space-y-3 border-t border-slate-800/70 pt-5">
          <h2 className="font-display text-xs font-semibold tracking-wide text-slate-300">
            Typing Lines & Contact
          </h2>

          <div className="space-y-1">
            <label
              htmlFor="typing-lines"
              className="block text-[11px] text-slate-400"
            >
              Typing Animation Lines (one per line)
            </label>
            <textarea
              id="typing-lines"
              rows={4}
              value={config.typingLines.join('\n')}
              onChange={(e) => updateTypingLines(e.target.value)}
              className="w-full rounded-md border border-slate-800 bg-[#090D16] px-2.5 py-2 text-xs leading-relaxed text-slate-200 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div className="space-y-2 pt-1">
            <label className="flex cursor-pointer items-center justify-between text-xs text-slate-300">
              <span>Include Email Badge</span>
              <input
                type="checkbox"
                checked={config.showEmail}
                onChange={(e) => onChange({ ...config, showEmail: e.target.checked })}
                className="h-3.5 w-3.5 rounded border-slate-700 bg-slate-900 accent-blue-500"
              />
            </label>
            {config.showEmail && (
              <input
                type="email"
                value={config.email}
                onChange={(e) => onChange({ ...config, email: e.target.value })}
                placeholder="you@example.com"
                className="w-full rounded-md border border-slate-800 bg-[#090D16] px-2.5 py-1.5 font-mono text-[11px] text-slate-200 placeholder:text-slate-600 focus:border-blue-500 focus:outline-none"
              />
            )}
          </div>

          <div className="space-y-1">
            <label htmlFor="linkedin-url" className="block text-[11px] text-slate-400">
              LinkedIn URL (optional)
            </label>
            <input
              id="linkedin-url"
              type="url"
              value={config.linkedinUrl}
              onChange={(e) => onChange({ ...config, linkedinUrl: e.target.value })}
              placeholder="https://linkedin.com/in/..."
              className="w-full rounded-md border border-slate-800 bg-[#090D16] px-2.5 py-1.5 font-mono text-[11px] text-slate-200 placeholder:text-slate-600 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="portfolio-url" className="block text-[11px] text-slate-400">
              Portfolio URL (optional)
            </label>
            <input
              id="portfolio-url"
              type="url"
              value={config.portfolioUrl}
              onChange={(e) => onChange({ ...config, portfolioUrl: e.target.value })}
              placeholder="https://your-site.dev"
              className="w-full rounded-md border border-slate-800 bg-[#090D16] px-2.5 py-1.5 font-mono text-[11px] text-slate-200 placeholder:text-slate-600 focus:border-blue-500 focus:outline-none"
            />
          </div>
        </section>
      </div>

      {/* Bottom Studio Actions */}
      <div className="flex items-center gap-2 border-t border-slate-800/80 px-5 py-3.5">
        <button
          type="button"
          onClick={onDownload}
          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-2 text-xs font-medium text-slate-100 transition-colors hover:border-slate-600 hover:bg-slate-800 cursor-pointer whitespace-nowrap"
        >
          <Download className="h-3.5 w-3.5" />
          <span>Download .md</span>
        </button>
        <button
          type="button"
          onClick={onReset}
          title="Reset to defaults"
          className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-800 bg-[#090D16] px-3 py-2 text-xs font-medium text-slate-400 transition-colors hover:border-slate-700 hover:text-slate-200 cursor-pointer whitespace-nowrap"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Reset</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop persistent sidebar */}
      <aside className="hidden w-[290px] shrink-0 border-r border-slate-800/80 lg:block">
        <div className="sticky top-14 h-[calc(100vh-3.5rem)]">{content}</div>
      </aside>

      {/* Mobile slide-over drawer */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={onCloseMobile}
            aria-hidden="true"
          />
          <aside className="relative z-10 h-full w-80 max-w-[85vw] border-r border-slate-800 shadow-2xl">
            {content}
          </aside>
        </div>
      )}
    </>
  );
}
