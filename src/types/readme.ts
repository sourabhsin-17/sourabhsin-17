export type AccentThemeId =
  | 'spiderman-crimson'
  | 'cobalt-violet'
  | 'sapphire-indigo'
  | 'midnight-amethyst';

export type BannerBgTheme =
  | 'spider-web'
  | 'aurora-grid'
  | 'cosmic-constellation'
  | 'cyber-terminal';

export type BannerMode = 'repo-svg' | 'external-url';

export type TechStyle = 'shields' | 'skillicons';

export type ProjectLayout = 'grid' | 'stacked';

export type ViewMode = 'preview' | 'markdown' | 'split';

export interface ThemePreset {
  id: AccentThemeId;
  name: string;
  primaryHex: string;
  secondaryHex: string;
  gradientStart: string;
  gradientMid: string;
  gradientEnd: string;
  statsTitleHex: string;
  statsIconHex: string;
  statsThemeName: string;
}

export interface TechItem {
  id: string;
  name: string;
  category: 'Frontend' | 'Backend & Data' | 'Tools & Workflow';
  shieldColor: string;
  logo: string;
  logoColor: string;
  skillIconId: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  technologies: string[];
  repoUrl: string;
}

export interface ReadmeSections {
  banner: boolean;
  typing: boolean;
  about: boolean;
  avatarInAbout: boolean;
  techStack: boolean;
  projects: boolean;
  stats: boolean;
  activityGraph: boolean;
  streak: boolean;
  languages: boolean;
  connect: boolean;
  footer: boolean;
}

export interface ReadmeConfig {
  name: string;
  username: string;
  location: string;
  focus: string;
  introSummary: string;
  interests: string;
  email: string;
  showEmail: boolean;
  linkedinUrl: string;
  portfolioUrl: string;
  bannerSubtitle: string;
  bannerBgTheme: BannerBgTheme;
  bannerMode: BannerMode;
  typingLines: string[];
  themeId: AccentThemeId;
  techStyle: TechStyle;
  projectLayout: ProjectLayout;
  sections: ReadmeSections;
  projects: ProjectItem[];
  footerNote: string;
}
