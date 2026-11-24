import { useEffect, useMemo, useState } from 'react';
import { BookOpen, Download, ExternalLink, Flame, GitCommitHorizontal, Globe, Mail, MapPin, Star } from 'lucide-react';
import { SPIDER_AVATAR_PATH, TECH_STACK, THEME_PRESETS } from '../data/defaultConfig';
import { ReadmeConfig } from '../types/readme';
import { generateBannerSvg, generateFooterSvg } from '../utils/generateSvgAssets';
import { TechGlyph } from './TechGlyph';

interface ReadmePreviewProps {
  config: ReadmeConfig;
  onDownload: () => void;
}

export function ReadmePreview({ config, onDownload }: ReadmePreviewProps) {
  const theme = THEME_PRESETS[config.themeId];
  const username = config.username.trim() || 'sourabhsin-17';
  const activeLines = config.typingLines.map((l) => l.trim()).filter(Boolean);

  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  const bannerSvgUri = useMemo(() => {
    const svg = generateBannerSvg(config);
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  }, [config]);

  const footerSvgUri = useMemo(() => {
    const svg = generateFooterSvg(config);
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  }, [config]);

  useEffect(() => {
    if (activeLines.length === 0) return;

    const currentLine = activeLines[lineIndex % activeLines.length];

    const timeout = window.setTimeout(
      () => {
        if (!deleting) {
          if (charIndex < currentLine.length) {
            setCharIndex((c) => c + 1);
          } else {
            window.setTimeout(() => setDeleting(true), 1200);
          }
        } else {
          if (charIndex > 0) {
            setCharIndex((c) => c - 1);
          } else {
            setDeleting(false);
            setLineIndex((idx) => (idx + 1) % activeLines.length);
          }
        }
      },
      deleting ? 32 : 58
    );

    return () => window.clearTimeout(timeout);
  }, [activeLines, lineIndex, charIndex, deleting]);

  useEffect(() => {
    setLineIndex(0);
    setCharIndex(0);
    setDeleting(false);
  }, [config.typingLines.join('|')]);

  const typedText =
    activeLines.length > 0
      ? activeLines[lineIndex % activeLines.length].slice(0, charIndex)
      : '';

  const categories: ('Frontend' | 'Backend & Data' | 'Tools & Workflow')[] = [
    'Frontend',
    'Backend & Data',
    'Tools & Workflow',
  ];

  return (
    <div className="space-y-4">
      {/* Compact GitHub Profile Identity Strip showing the GitHub Account Avatar */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-800/90 bg-[#0D1117] px-5 py-4">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full border border-slate-700 bg-[#070913]">
            <img
              src={SPIDER_AVATAR_PATH}
              alt={`${config.name} GitHub profile avatar`}
              className="h-full w-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <div className="font-display text-base font-bold text-slate-100">
              {config.name}
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
              <span className="font-mono">@{username}</span>
              <span aria-hidden="true">·</span>
              <span>{config.location}</span>
              <span aria-hidden="true">·</span>
              <span>GitHub Account Avatar Preview</span>
            </div>
          </div>
        </div>

        <a
          href="https://github.com/settings/profile"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-md border border-slate-700/80 bg-[#161B22] px-3 py-1.5 text-xs font-medium text-slate-200 transition-colors hover:border-slate-600 hover:bg-[#21262D] whitespace-nowrap"
        >
          <span>GitHub Profile Settings</span>
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>

      {/* Main GitHub README Frame */}
      <div className="overflow-hidden rounded-xl border border-slate-800/90 bg-[#0D1117] text-slate-200 shadow-2xl shadow-black/40">
        {/* Authentic GitHub Repository File Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/90 bg-[#161B22] px-5 py-3">
          <div className="flex items-center gap-2.5 text-xs">
            <BookOpen className="h-4 w-4 text-slate-400" />
            <a
              href={`https://github.com/${username}`}
              target="_blank"
              rel="noreferrer"
              className="font-mono font-medium text-blue-400 hover:underline"
            >
              {username}
            </a>
            <span className="text-slate-600">/</span>
            <span className="font-mono font-semibold text-slate-100">README.md</span>
          </div>

          <button
            type="button"
            onClick={onDownload}
            className="inline-flex items-center gap-1.5 rounded-md border border-slate-700/80 bg-[#21262D] px-3 py-1.5 text-xs font-medium text-slate-200 transition-colors hover:border-slate-600 hover:bg-[#30363D] cursor-pointer whitespace-nowrap"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Download .md</span>
          </button>
        </div>

        {/* Rendered README Content Canvas */}
        <div className="mx-auto max-w-[920px] space-y-10 px-6 py-8 sm:px-10 sm:py-10">
          {/* 1. Animated Themed Banner */}
          {config.sections.banner && (
            <div className="overflow-hidden rounded-xl">
              <img
                src={bannerSvgUri}
                alt={`${config.name} Banner`}
                className="block w-full h-auto"
                referrerPolicy="no-referrer"
              />
            </div>
          )}

          {/* 2. Typing Animation Introduction */}
          {config.sections.typing && activeLines.length > 0 && (
            <div className="flex min-h-[2.25rem] items-center justify-center text-center">
              <p
                className="font-mono text-base font-semibold tracking-tight sm:text-lg"
                style={{ color: `#${theme.statsTitleHex}` }}
              >
                <span>{typedText}</span>
                <span
                  aria-hidden="true"
                  className="animate-caret ml-1 inline-block h-5 w-[2px] translate-y-0.5 align-baseline"
                  style={{ backgroundColor: `#${theme.statsIconHex}` }}
                />
              </p>
            </div>
          )}

          {/* 3. About Me (with 2-column Avatar layout when enabled) */}
          {config.sections.about && (
            <section className="space-y-5 border-t border-slate-800/80 pt-8">
              <h2 className="font-display text-xl font-bold tracking-tight text-slate-100">
                About Me
              </h2>

              <div
                className={
                  config.sections.avatarInAbout
                    ? 'grid grid-cols-1 items-center gap-6 rounded-xl border border-slate-800/80 bg-[#111622]/70 p-6 sm:grid-cols-[160px_1fr]'
                    : 'space-y-5'
                }
              >
                {config.sections.avatarInAbout && (
                  <div className="flex flex-col items-center gap-2.5 text-center">
                    <div className="h-32 w-32 overflow-hidden rounded-xl border border-slate-700/80 bg-[#070913]">
                      <img
                        src={SPIDER_AVATAR_PATH}
                        alt={`${config.name} Avatar`}
                        className="h-full w-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="space-y-0.5">
                      <div className="font-mono text-xs font-semibold text-slate-200">
                        @{username}
                      </div>
                      <div className="text-[11px] text-slate-400">{config.location}</div>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  <p className="text-[15px] leading-7 tracking-[0.01em] text-slate-300">
                    {config.introSummary}
                  </p>

                  <div className="grid grid-cols-1 gap-3 pt-1 sm:grid-cols-2">
                    <div className="flex items-start gap-2.5 rounded-lg border border-slate-800/80 bg-[#0D1117]/80 px-3.5 py-3">
                      <MapPin
                        className="mt-0.5 h-4 w-4 shrink-0"
                        style={{ color: `#${theme.statsTitleHex}` }}
                      />
                      <div className="space-y-0.5">
                        <div className="text-[11px] font-medium text-slate-400">Location</div>
                        <div className="text-xs font-medium text-slate-100">{config.location}</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 rounded-lg border border-slate-800/80 bg-[#0D1117]/80 px-3.5 py-3">
                      <Globe
                        className="mt-0.5 h-4 w-4 shrink-0"
                        style={{ color: `#${theme.statsIconHex}` }}
                      />
                      <div className="space-y-0.5">
                        <div className="text-[11px] font-medium text-slate-400">Current Focus</div>
                        <div className="text-xs font-medium text-slate-100">{config.focus}</div>
                      </div>
                    </div>

                    <div className="rounded-lg border border-slate-800/80 bg-[#0D1117]/80 px-3.5 py-3 sm:col-span-2">
                      <div className="text-[11px] font-medium text-slate-400">Interests</div>
                      <div className="mt-0.5 text-xs leading-relaxed text-slate-200">
                        {config.interests}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* 4. Technologies & Tools */}
          {config.sections.techStack && (
            <section className="space-y-5 border-t border-slate-800/80 pt-8">
              <div className="space-y-1.5">
                <h2 className="font-display text-xl font-bold tracking-tight text-slate-100">
                  Technologies & Tools I&apos;m Working With
                </h2>
                <p className="text-sm text-slate-400">
                  Actively building projects and deepening my fundamentals across these tools.
                </p>
              </div>

              {config.techStyle === 'skillicons' ? (
                <div className="mx-auto grid max-w-xl grid-cols-4 gap-3 pt-2 sm:grid-cols-6">
                  {TECH_STACK.map((tech) => (
                    <div
                      key={tech.id}
                      className="flex flex-col items-center justify-center gap-2 rounded-xl border border-slate-800/90 bg-[#141923] p-3.5 transition-colors hover:border-slate-700"
                      title={tech.name}
                    >
                      <TechGlyph id={tech.id} size={28} />
                      <span className="text-[11px] font-medium text-slate-300">{tech.name}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-5 pt-1">
                  {categories.map((category) => {
                    const items = TECH_STACK.filter((t) => t.category === category);
                    return (
                      <div key={category} className="space-y-2.5 text-center">
                        <div className="text-xs font-semibold tracking-wide text-slate-400">
                          {category}
                        </div>
                        <div className="flex flex-wrap items-center justify-center gap-2.5">
                          {items.map((tech) => (
                            <div
                              key={tech.id}
                              className="inline-flex items-center gap-2 rounded-md border border-slate-800 bg-[#0F172A] px-3 py-1.5 text-xs font-semibold tracking-wide text-slate-100 transition-colors hover:border-blue-500/40"
                            >
                              <TechGlyph id={tech.id} size={15} />
                              <span>{tech.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          )}

          {/* 5. Featured Projects */}
          {config.sections.projects && (
            <section className="space-y-5 border-t border-slate-800/80 pt-8">
              <div className="space-y-1.5">
                <h2 className="font-display text-xl font-bold tracking-tight text-slate-100">
                  Featured Projects
                </h2>
                <p className="text-sm text-slate-400">
                  Selected web applications I am building and exploring across campus life and music.
                </p>
              </div>

              {config.projectLayout === 'grid' ? (
                <div className="overflow-hidden rounded-xl border border-slate-800/90">
                  <table className="w-full border-collapse text-left">
                    <tbody>
                      {config.projects.map((project, index) => (
                        <tr
                          key={project.id}
                          className={index !== 0 ? 'border-t border-slate-800/80' : ''}
                        >
                          <td className="block w-full p-5 align-top sm:table-cell sm:w-[32%]">
                            <div className="font-display text-base font-bold text-slate-100">
                              {project.name}
                            </div>
                            <div className="mt-1 text-xs text-slate-400">
                              {project.tagline}
                            </div>
                          </td>
                          <td className="block w-full border-t border-slate-800/50 bg-[#111622]/40 p-5 align-top sm:table-cell sm:w-[68%] sm:border-l sm:border-t-0">
                            <p className="text-sm leading-relaxed text-slate-300">
                              {project.description}
                            </p>
                            <div className="mt-3.5 flex flex-wrap items-center gap-2">
                              {project.technologies.map((techName) => (
                                <span
                                  key={techName}
                                  className="inline-flex items-center gap-1.5 rounded border border-slate-800 bg-[#161B22] px-2.5 py-1 text-[11px] font-medium text-slate-200"
                                >
                                  <TechGlyph id={techName} size={13} />
                                  <span>{techName}</span>
                                </span>
                              ))}
                            </div>
                            {project.repoUrl.trim() && (
                              <div className="mt-4">
                                <a
                                  href={project.repoUrl.trim()}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90"
                                  style={{ backgroundColor: `#${theme.primaryHex}` }}
                                >
                                  <span>View Repository</span>
                                  <ExternalLink className="h-3 w-3" />
                                </a>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="space-y-4">
                  {config.projects.map((project) => (
                    <article
                      key={project.id}
                      className="rounded-xl border border-slate-800/90 bg-[#111622]/70 p-5"
                    >
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h3 className="font-display text-base font-bold text-slate-100">
                          {project.name}
                        </h3>
                        <span className="text-xs text-slate-400">{project.tagline}</span>
                      </div>
                      <p className="mt-2.5 text-sm leading-relaxed text-slate-300">
                        {project.description}
                      </p>
                      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex flex-wrap items-center gap-2">
                          {project.technologies.map((techName) => (
                            <span
                              key={techName}
                              className="inline-flex items-center gap-1.5 rounded border border-slate-800 bg-[#161B22] px-2.5 py-1 text-[11px] font-medium text-slate-200"
                            >
                              <TechGlyph id={techName} size={13} />
                              <span>{techName}</span>
                            </span>
                          ))}
                        </div>
                        {project.repoUrl.trim() && (
                          <a
                            href={project.repoUrl.trim()}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90"
                            style={{ backgroundColor: `#${theme.primaryHex}` }}
                          >
                            <span>View Repository</span>
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* 6. GitHub Activity & Statistics */}
          {(config.sections.stats ||
            config.sections.languages ||
            config.sections.streak ||
            config.sections.activityGraph) && (
            <section className="space-y-5 border-t border-slate-800/80 pt-8">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="font-display text-xl font-bold tracking-tight text-slate-100">
                  GitHub Activity & Statistics
                </h2>
                <span className="font-mono text-[11px] text-slate-400">
                  Dynamic SVG cards for @{username}
                </span>
              </div>

              {(config.sections.stats || config.sections.languages) && (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {config.sections.stats && (
                    <div className="flex flex-col justify-between rounded-xl border border-slate-800 bg-[#0D1117] p-5">
                      <div className="flex items-center justify-between">
                        <h3
                          className="font-display text-sm font-bold"
                          style={{ color: `#${theme.statsTitleHex}` }}
                        >
                          {config.name}&apos;s GitHub Stats
                        </h3>
                        <span className="font-mono text-[11px] text-slate-500">Live SVG</span>
                      </div>

                      <div className="mt-4 flex items-center justify-between gap-4">
                        <dl className="flex-1 space-y-2 text-xs">
                          <div className="flex items-center justify-between text-slate-300">
                            <dt className="flex items-center gap-2">
                              <Star className="h-3.5 w-3.5" style={{ color: `#${theme.statsIconHex}` }} />
                              <span>Total Stars Earned</span>
                            </dt>
                            <dd className="font-mono tabular-nums text-slate-400">Auto</dd>
                          </div>
                          <div className="flex items-center justify-between text-slate-300">
                            <dt className="flex items-center gap-2">
                              <GitCommitHorizontal className="h-3.5 w-3.5" style={{ color: `#${theme.statsIconHex}` }} />
                              <span>Total Commits</span>
                            </dt>
                            <dd className="font-mono tabular-nums text-slate-400">Auto</dd>
                          </div>
                          <div className="flex items-center justify-between text-slate-300">
                            <dt className="flex items-center gap-2">
                              <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: `#${theme.statsIconHex}` }} />
                              <span>Total PRs & Issues</span>
                            </dt>
                            <dd className="font-mono tabular-nums text-slate-400">Auto</dd>
                          </div>
                          <div className="flex items-center justify-between text-slate-300">
                            <dt className="flex items-center gap-2">
                              <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: `#${theme.statsTitleHex}` }} />
                              <span>Contributed To</span>
                            </dt>
                            <dd className="font-mono tabular-nums text-slate-400">Auto</dd>
                          </div>
                        </dl>

                        <div
                          className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-slate-700/80 font-mono text-xs font-semibold text-slate-300"
                          style={{
                            borderTopColor: `#${theme.primaryHex}`,
                            borderRightColor: `#${theme.secondaryHex}`,
                          }}
                        >
                          SVG
                        </div>
                      </div>
                    </div>
                  )}

                  {config.sections.languages && (
                    <div className="flex flex-col justify-between rounded-xl border border-slate-800 bg-[#0D1117] p-5">
                      <div className="flex items-center justify-between">
                        <h3
                          className="font-display text-sm font-bold"
                          style={{ color: `#${theme.statsTitleHex}` }}
                        >
                          Most Used Languages
                        </h3>
                        <span className="font-mono text-[11px] text-slate-500">Compact Layout</span>
                      </div>

                      <div className="mt-4 space-y-3">
                        <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-slate-800">
                          <div className="h-full bg-[#F7DF1E]" style={{ width: '34%' }} />
                          <div className="h-full bg-[#3B82F6]" style={{ width: '24%' }} />
                          <div className="h-full bg-[#E34F26]" style={{ width: '18%' }} />
                          <div className="h-full bg-[#8B5CF6]" style={{ width: '14%' }} />
                          <div className="h-full bg-[#38BDF8]" style={{ width: '10%' }} />
                        </div>

                        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-slate-300">
                          <div className="flex items-center gap-2">
                            <span className="h-2.5 w-2.5 rounded-full bg-[#F7DF1E]" />
                            <span>JavaScript</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="h-2.5 w-2.5 rounded-full bg-[#3B82F6]" />
                            <span>Python</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="h-2.5 w-2.5 rounded-full bg-[#E34F26]" />
                            <span>HTML</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="h-2.5 w-2.5 rounded-full bg-[#8B5CF6]" />
                            <span>CSS</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {config.sections.streak && (
                <div className="mx-auto max-w-xl rounded-xl border border-slate-800 bg-[#0D1117] px-6 py-5">
                  <div className="grid grid-cols-3 items-center divide-x divide-slate-800 text-center">
                    <div className="px-2">
                      <div className="font-mono text-base font-bold tabular-nums text-slate-100">
                        Auto
                      </div>
                      <div className="mt-1 text-[11px] font-medium text-slate-400">
                        Total Contributions
                      </div>
                    </div>

                    <div className="flex flex-col items-center px-2">
                      <div
                        className="flex h-14 w-14 flex-col items-center justify-center rounded-full border-2"
                        style={{
                          borderColor: `#${theme.secondaryHex}`,
                          borderTopColor: `#${theme.primaryHex}`,
                        }}
                      >
                        <Flame className="h-4 w-4" style={{ color: `#${theme.statsIconHex}` }} />
                      </div>
                      <div
                        className="mt-1.5 text-[11px] font-semibold"
                        style={{ color: `#${theme.statsTitleHex}` }}
                      >
                        Current Streak
                      </div>
                    </div>

                    <div className="px-2">
                      <div className="font-mono text-base font-bold tabular-nums text-slate-100">
                        Auto
                      </div>
                      <div className="mt-1 text-[11px] font-medium text-slate-400">
                        Longest Streak
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {config.sections.activityGraph && (
                <div className="rounded-xl border border-slate-800 bg-[#0D1117] p-5">
                  <div className="mb-3 flex items-center justify-between">
                    <span
                      className="font-display text-xs font-bold"
                      style={{ color: `#${theme.statsTitleHex}` }}
                    >
                      {config.name}&apos;s Contribution Graph
                    </span>
                    <span className="font-mono text-[11px] text-slate-500">Activity Area</span>
                  </div>
                  <svg viewBox="0 0 720 120" className="w-full h-24" aria-hidden="true">
                    <defs>
                      <linearGradient id="graphAreaPreview" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor={`#${theme.primaryHex}`} stopOpacity="0.45" />
                        <stop offset="100%" stopColor={`#${theme.primaryHex}`} stopOpacity="0.02" />
                      </linearGradient>
                    </defs>
                    <line x1="0" y1="30" x2="720" y2="30" stroke="#1E293B" strokeDasharray="3 4" />
                    <line x1="0" y1="65" x2="720" y2="65" stroke="#1E293B" strokeDasharray="3 4" />
                    <line x1="0" y1="100" x2="720" y2="100" stroke="#1E293B" strokeDasharray="3 4" />
                    <path
                      d="M0,100 L60,88 L120,92 L180,68 L240,74 L300,48 L360,58 L420,34 L480,52 L540,28 L600,42 L660,22 L720,36 L720,115 L0,115 Z"
                      fill="url(#graphAreaPreview)"
                    />
                    <path
                      d="M0,100 L60,88 L120,92 L180,68 L240,74 L300,48 L360,58 L420,34 L480,52 L540,28 L600,42 L660,22 L720,36"
                      fill="none"
                      stroke={`#${theme.primaryHex}`}
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {[
                      [60, 88],
                      [180, 68],
                      [300, 48],
                      [420, 34],
                      [540, 28],
                      [660, 22],
                    ].map(([cx, cy], idx) => (
                      <circle key={idx} cx={cx} cy={cy} r="3.5" fill={`#${theme.statsIconHex}`} />
                    ))}
                  </svg>
                </div>
              )}

              <p className="text-center text-xs text-slate-500">
                Live contribution counts, language shares, and streak totals populate automatically from GitHub when published to{' '}
                <span className="font-mono text-slate-400">
                  github.com/{username}/{username}
                </span>
                .
              </p>
            </section>
          )}

          {/* 7. Connect With Me */}
          {config.sections.connect && (
            <section className="space-y-4 border-t border-slate-800/80 pt-8 text-center">
              <h2 className="font-display text-xl font-bold tracking-tight text-slate-100">
                Connect With Me
              </h2>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
                <a
                  href={`https://github.com/${username}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border border-slate-800 bg-[#0F172A] px-4 py-2 text-xs font-semibold text-slate-100 transition-colors hover:border-slate-700"
                >
                  <TechGlyph id="github" size={15} />
                  <span>GitHub · {username}</span>
                </a>

                {config.showEmail && config.email.trim() && (
                  <a
                    href={`mailto:${config.email.trim()}`}
                    className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90"
                    style={{ backgroundColor: `#${theme.primaryHex}` }}
                  >
                    <Mail className="h-3.5 w-3.5" />
                    <span>Email Me</span>
                  </a>
                )}

                {config.linkedinUrl.trim() && (
                  <a
                    href={config.linkedinUrl.trim()}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-md bg-[#1D4ED8] px-4 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    <span>LinkedIn</span>
                  </a>
                )}

                {config.portfolioUrl.trim() && (
                  <a
                    href={config.portfolioUrl.trim()}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90"
                    style={{ backgroundColor: `#${theme.secondaryHex}` }}
                  >
                    <Globe className="h-3.5 w-3.5" />
                    <span>Portfolio</span>
                  </a>
                )}
              </div>
            </section>
          )}

          {/* 8. Stylish Footer */}
          {config.sections.footer && (
            <footer className="border-t border-slate-800/80 pt-8 text-center">
              <div className="overflow-hidden rounded-xl">
                <img
                  src={footerSvgUri}
                  alt="Footer Wave"
                  className="block w-full h-auto"
                  referrerPolicy="no-referrer"
                />
              </div>
            </footer>
          )}
        </div>
      </div>
    </div>
  );
}
