import { THEME_PRESETS } from '../data/defaultConfig';
import { ReadmeConfig } from '../types/readme';

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function generateBannerSvg(config: ReadmeConfig): string {
  const theme = THEME_PRESETS[config.themeId];
  const name = escapeXml(config.name.trim() || 'Sourabh Singh');
  const subtitle = escapeXml(
    config.bannerSubtitle.trim() || `${config.focus} · ${config.location}`
  );
  const kicker = escapeXml(
    `WEB & FULL-STACK DEVELOPER · @${config.username.trim() || 'sourabhsin-17'}`
  );

  const primary = `#${theme.primaryHex}`;
  const secondary = `#${theme.secondaryHex}`;
  const titleAccent = `#${theme.statsTitleHex}`;
  const iconAccent = `#${theme.statsIconHex}`;

  let backgroundPattern = '';
  let emblemSvg = '';
  let kickerY = 96;
  let nameY = 152;
  let dividerY = 170;
  let subtitleY = 204;

  if (config.bannerBgTheme === 'spider-web') {
    kickerY = 112;
    nameY = 165;
    dividerY = 182;
    subtitleY = 214;

    backgroundPattern = `
    <defs>
      <radialGradient id="spideyRed" cx="16%" cy="22%" r="55%">
        <stop offset="0%" stop-color="${primary}" stop-opacity="0.44"/>
        <stop offset="55%" stop-color="${primary}" stop-opacity="0.1"/>
        <stop offset="100%" stop-color="${primary}" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="spideyBlue" cx="84%" cy="24%" r="55%">
        <stop offset="0%" stop-color="${secondary}" stop-opacity="0.46"/>
        <stop offset="55%" stop-color="${secondary}" stop-opacity="0.12"/>
        <stop offset="100%" stop-color="${secondary}" stop-opacity="0"/>
      </radialGradient>
      <pattern id="halftone" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="0.85" fill="#E2E8F0" fill-opacity="0.09"/>
      </pattern>
      <radialGradient id="halftoneMaskGrad" cx="50%" cy="45%" r="58%">
        <stop offset="0%" stop-color="white" stop-opacity="0.9"/>
        <stop offset="100%" stop-color="white" stop-opacity="0.12"/>
      </radialGradient>
      <mask id="halftoneMask">
        <rect width="1200" height="300" fill="url(#halftoneMaskGrad)"/>
      </mask>
      <linearGradient id="accentLine" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="${primary}" stop-opacity="0"/>
        <stop offset="28%" stop-color="${primary}"/>
        <stop offset="72%" stop-color="${secondary}"/>
        <stop offset="100%" stop-color="${secondary}" stop-opacity="0"/>
      </linearGradient>
    </defs>

    <rect width="1200" height="300" rx="16" fill="#070913"/>
    <rect width="1200" height="300" rx="16" fill="url(#spideyRed)">
      <animate attributeName="opacity" values="0.84;1;0.84" dur="6s" repeatCount="indefinite"/>
    </rect>
    <rect width="1200" height="300" rx="16" fill="url(#spideyBlue)">
      <animate attributeName="opacity" values="1;0.84;1" dur="7s" repeatCount="indefinite"/>
    </rect>
    <rect width="1200" height="300" rx="16" fill="url(#halftone)" mask="url(#halftoneMask)"/>

    <!-- Left Corner Spider-Web -->
    <g stroke="#E2E8F0" stroke-opacity="0.2" stroke-width="1.1" fill="none">
      <line x1="0" y1="0" x2="310" y2="55"/>
      <line x1="0" y1="0" x2="275" y2="140"/>
      <line x1="0" y1="0" x2="210" y2="215"/>
      <line x1="0" y1="0" x2="120" y2="265"/>
      <line x1="0" y1="0" x2="32" y2="285"/>
      <path d="M 65,12 Q 52,32 58,30 Q 44,48 44,45 Q 28,58 25,56 Q 12,64 7,62"/>
      <path d="M 130,23 Q 108,58 115,59 Q 90,88 88,90 Q 58,112 50,111 Q 26,126 14,124"/>
      <path d="M 198,35 Q 166,84 176,90 Q 138,132 134,137 Q 90,168 77,169 Q 42,190 21,188"/>
      <path d="M 268,48 Q 225,112 238,121 Q 186,176 181,185 Q 122,226 104,228 Q 56,254 28,250"/>
    </g>

    <!-- Right Corner Spider-Web -->
    <g stroke="#E2E8F0" stroke-opacity="0.2" stroke-width="1.1" fill="none">
      <line x1="1200" y1="0" x2="890" y2="55"/>
      <line x1="1200" y1="0" x2="925" y2="140"/>
      <line x1="1200" y1="0" x2="990" y2="215"/>
      <line x1="1200" y1="0" x2="1080" y2="265"/>
      <line x1="1200" y1="0" x2="1168" y2="285"/>
      <path d="M 1135,12 Q 1148,32 1142,30 Q 1156,48 1156,45 Q 1172,58 1175,56 Q 1188,64 1193,62"/>
      <path d="M 1070,23 Q 1092,58 1085,59 Q 1110,88 1112,90 Q 1142,112 1150,111 Q 1174,126 1186,124"/>
      <path d="M 1002,35 Q 1034,84 1024,90 Q 1062,132 1066,137 Q 1110,168 1123,169 Q 1158,190 1179,188"/>
      <path d="M 932,48 Q 975,112 962,121 Q 1014,176 1019,185 Q 1078,226 1096,228 Q 1144,254 1172,250"/>
    </g>

    <line x1="600" y1="0" x2="600" y2="42" stroke="#E2E8F0" stroke-opacity="0.3" stroke-width="1.1"/>`;

    emblemSvg = `
    <g transform="translate(600, 60)" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="0" cy="0" r="18" fill="#0B1120" stroke="${primary}" stroke-opacity="0.72" stroke-width="1.4"/>
      <ellipse cx="0" cy="3" rx="3.8" ry="5.5" fill="${primary}"/>
      <circle cx="0" cy="-4.5" r="2.5" fill="${primary}"/>
      <path d="M-3,-2 L-9,-8 L-11,-3" stroke="#F8FAFC" stroke-width="1.4"/>
      <path d="M-3.5,0 L-11,-2 L-12,4" stroke="#F8FAFC" stroke-width="1.4"/>
      <path d="M-3.5,2.5 L-11,5 L-10,11" stroke="#F8FAFC" stroke-width="1.4"/>
      <path d="M-2.5,5 L-8,10 L-6,14" stroke="#F8FAFC" stroke-width="1.4"/>
      <path d="M3,-2 L9,-8 L11,-3" stroke="#F8FAFC" stroke-width="1.4"/>
      <path d="M3.5,0 L11,-2 L12,4" stroke="#F8FAFC" stroke-width="1.4"/>
      <path d="M3.5,2.5 L11,5 L10,11" stroke="#F8FAFC" stroke-width="1.4"/>
      <path d="M2.5,5 L8,10 L6,14" stroke="#F8FAFC" stroke-width="1.4"/>
    </g>`;
  } else if (config.bannerBgTheme === 'aurora-grid') {
    backgroundPattern = `
    <defs>
      <pattern id="techGrid" width="36" height="36" patternUnits="userSpaceOnUse">
        <path d="M 36 0 L 0 0 0 36" fill="none" stroke="${titleAccent}" stroke-width="0.6" stroke-opacity="0.14"/>
      </pattern>
      <radialGradient id="gridMaskGrad" cx="50%" cy="45%" r="60%">
        <stop offset="0%" stop-color="white" stop-opacity="1"/>
        <stop offset="100%" stop-color="white" stop-opacity="0"/>
      </radialGradient>
      <mask id="gridMask">
        <rect width="1200" height="300" fill="url(#gridMaskGrad)"/>
      </mask>
      <radialGradient id="auroraLeft" cx="22%" cy="28%" r="48%">
        <stop offset="0%" stop-color="${primary}" stop-opacity="0.48"/>
        <stop offset="100%" stop-color="${primary}" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="auroraRight" cx="78%" cy="32%" r="48%">
        <stop offset="0%" stop-color="${secondary}" stop-opacity="0.45"/>
        <stop offset="100%" stop-color="${secondary}" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="auroraCenter" cx="50%" cy="62%" r="45%">
        <stop offset="0%" stop-color="${titleAccent}" stop-opacity="0.22"/>
        <stop offset="100%" stop-color="${titleAccent}" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="accentLine" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="${primary}" stop-opacity="0"/>
        <stop offset="30%" stop-color="${titleAccent}"/>
        <stop offset="70%" stop-color="${iconAccent}"/>
        <stop offset="100%" stop-color="${secondary}" stop-opacity="0"/>
      </linearGradient>
    </defs>

    <rect width="1200" height="300" rx="16" fill="#070B14"/>
    <rect width="1200" height="300" rx="16" fill="url(#auroraLeft)">
      <animate attributeName="opacity" values="0.85;1;0.85" dur="7s" repeatCount="indefinite"/>
    </rect>
    <rect width="1200" height="300" rx="16" fill="url(#auroraRight)">
      <animate attributeName="opacity" values="1;0.8;1" dur="8s" repeatCount="indefinite"/>
    </rect>
    <rect width="1200" height="300" rx="16" fill="url(#auroraCenter)"/>
    <rect width="1200" height="300" rx="16" fill="url(#techGrid)" mask="url(#gridMask)"/>`;
  } else if (config.bannerBgTheme === 'cosmic-constellation') {
    backgroundPattern = `
    <defs>
      <radialGradient id="cosmicGlow1" cx="25%" cy="35%" r="52%">
        <stop offset="0%" stop-color="${primary}" stop-opacity="0.42"/>
        <stop offset="100%" stop-color="${primary}" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="cosmicGlow2" cx="76%" cy="25%" r="50%">
        <stop offset="0%" stop-color="${secondary}" stop-opacity="0.44"/>
        <stop offset="100%" stop-color="${secondary}" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="accentLine" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="${primary}" stop-opacity="0"/>
        <stop offset="50%" stop-color="${iconAccent}"/>
        <stop offset="100%" stop-color="${secondary}" stop-opacity="0"/>
      </linearGradient>
    </defs>

    <rect width="1200" height="300" rx="16" fill="#060913"/>
    <rect width="1200" height="300" rx="16" fill="url(#cosmicGlow1)"/>
    <rect width="1200" height="300" rx="16" fill="url(#cosmicGlow2)"/>

    <g stroke="${titleAccent}" stroke-width="0.9" stroke-opacity="0.22" fill="none">
      <path d="M90,190 L185,95 L305,132 L255,220 Z"/>
      <path d="M185,95 L120,45"/>
      <path d="M915,85 L1035,55 L1115,145 L985,195 Z"/>
      <path d="M1035,55 L1095,35"/>
      <ellipse cx="600" cy="145" rx="340" ry="110" stroke="${iconAccent}" stroke-opacity="0.14" stroke-dasharray="4 6"/>
    </g>
    <g fill="${titleAccent}">
      <circle cx="90" cy="190" r="2.6" opacity="0.65"/>
      <circle cx="185" cy="95" r="3.2" opacity="0.8"/>
      <circle cx="305" cy="132" r="2.2" opacity="0.6"/>
      <circle cx="255" cy="220" r="2.4" opacity="0.5"/>
      <circle cx="915" cy="85" r="2.5" opacity="0.7"/>
      <circle cx="1035" cy="55" r="3.2" opacity="0.85"/>
      <circle cx="1115" cy="145" r="2.4" opacity="0.6"/>
      <circle cx="985" cy="195" r="2.8" opacity="0.65"/>
    </g>`;
  } else {
    backgroundPattern = `
    <defs>
      <pattern id="circuitDots" width="24" height="24" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1" fill="${titleAccent}" fill-opacity="0.2"/>
      </pattern>
      <radialGradient id="termGlow" cx="50%" cy="45%" r="55%">
        <stop offset="0%" stop-color="${primary}" stop-opacity="0.34"/>
        <stop offset="55%" stop-color="${secondary}" stop-opacity="0.18"/>
        <stop offset="100%" stop-color="#090D16" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="accentLine" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="${primary}" stop-opacity="0"/>
        <stop offset="50%" stop-color="${titleAccent}"/>
        <stop offset="100%" stop-color="${secondary}" stop-opacity="0"/>
      </linearGradient>
    </defs>

    <rect width="1200" height="300" rx="16" fill="#090D16"/>
    <rect width="1200" height="300" rx="16" fill="url(#circuitDots)"/>
    <rect width="1200" height="300" rx="16" fill="url(#termGlow)"/>

    <g stroke="${primary}" stroke-width="1.2" stroke-opacity="0.25" fill="none">
      <path d="M40,68 H160 L195,103 H285"/>
      <path d="M1160,68 H1040 L1005,103 H915"/>
      <path d="M60,210 H190 L225,175 H310" stroke="${secondary}" stroke-opacity="0.22"/>
      <path d="M1140,210 H1010 L975,175 H890" stroke="${secondary}" stroke-opacity="0.22"/>
    </g>
    <circle cx="285" cy="103" r="3" fill="${titleAccent}" opacity="0.7"/>
    <circle cx="915" cy="103" r="3" fill="${titleAccent}" opacity="0.7"/>
    <circle cx="310" cy="175" r="3" fill="${iconAccent}" opacity="0.7"/>
    <circle cx="890" cy="175" r="3" fill="${iconAccent}" opacity="0.7"/>

    <circle cx="36" cy="30" r="4.5" fill="#EF4444" opacity="0.7"/>
    <circle cx="54" cy="30" r="4.5" fill="#F59E0B" opacity="0.7"/>
    <circle cx="72" cy="30" r="4.5" fill="#10B981" opacity="0.7"/>`;
  }

  return `<svg width="1200" height="300" viewBox="0 0 1200 300" fill="none" xmlns="http://www.w3.org/2000/svg">
  ${backgroundPattern}

  <rect x="0.75" y="0.75" width="1198.5" height="298.5" rx="15.25" stroke="${titleAccent}" stroke-opacity="0.22" stroke-width="1.5"/>

  ${emblemSvg}

  <text x="600" y="${kickerY}" text-anchor="middle" fill="${titleAccent}" font-family="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace" font-size="12" font-weight="600" letter-spacing="3.2" opacity="0.95">
    ${kicker}
  </text>

  <text x="600" y="${nameY}" text-anchor="middle" fill="#F8FAFC" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="52" font-weight="800" letter-spacing="-0.9">
    ${name}
  </text>

  <rect x="420" y="${dividerY}" width="360" height="2.5" rx="1.25" fill="url(#accentLine)">
    <animate attributeName="opacity" values="0.65;1;0.65" dur="3.6s" repeatCount="indefinite"/>
  </rect>

  <text x="600" y="${subtitleY}" text-anchor="middle" fill="#CBD5E1" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="16" font-weight="500" letter-spacing="0.25">
    ${subtitle}
  </text>

  <path d="M0,248 C220,288 420,218 640,256 C860,294 1040,224 1200,254 L1200,300 L0,300 Z" fill="#0D1117" fill-opacity="0.55">
    <animate attributeName="d" dur="9s" repeatCount="indefinite"
      values="M0,248 C220,288 420,218 640,256 C860,294 1040,224 1200,254 L1200,300 L0,300 Z;
              M0,258 C240,224 440,292 660,246 C880,210 1050,282 1200,246 L1200,300 L0,300 Z;
              M0,248 C220,288 420,218 640,256 C860,294 1040,224 1200,254 L1200,300 L0,300 Z" />
  </path>
  <path d="M0,266 C260,232 480,296 740,254 C960,218 1090,276 1200,258 L1200,300 L0,300 Z" fill="#0D1117">
    <animate attributeName="d" dur="11s" repeatCount="indefinite"
      values="M0,266 C260,232 480,296 740,254 C960,218 1090,276 1200,258 L1200,300 L0,300 Z;
              M0,254 C240,288 480,226 720,268 C940,298 1090,238 1200,264 L1200,300 L0,300 Z;
              M0,266 C260,232 480,296 740,254 C960,218 1090,276 1200,258 L1200,300 L0,300 Z" />
  </path>
</svg>
`;
}

export function generateFooterSvg(config: ReadmeConfig): string {
  const theme = THEME_PRESETS[config.themeId];
  const note = escapeXml(
    config.footerNote.trim() || 'Thanks for visiting — always learning and building.'
  );
  const primary = `#${theme.primaryHex}`;
  const secondary = `#${theme.secondaryHex}`;
  const titleAccent = `#${theme.statsTitleHex}`;

  const webAccents =
    config.bannerBgTheme === 'spider-web'
      ? `
  <g stroke="#E2E8F0" stroke-opacity="0.2" stroke-width="1" fill="none">
    <line x1="0" y1="130" x2="170" y2="55"/>
    <line x1="0" y1="130" x2="120" y2="25"/>
    <path d="M 45,110 Q 38,94 34,92"/>
    <path d="M 92,90 Q 78,66 70,63"/>
    <line x1="1200" y1="130" x2="1030" y2="55"/>
    <line x1="1200" y1="130" x2="1080" y2="25"/>
    <path d="M 1155,110 Q 1162,94 1166,92"/>
    <path d="M 1108,90 Q 1122,66 1130,63"/>
  </g>`
      : '';

  return `<svg width="1200" height="130" viewBox="0 0 1200 130" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="footerBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#070913"/>
      <stop offset="45%" stop-color="${primary}" stop-opacity="0.32"/>
      <stop offset="100%" stop-color="${secondary}" stop-opacity="0.38"/>
    </linearGradient>
    <pattern id="footerGrid" width="32" height="32" patternUnits="userSpaceOnUse">
      <path d="M 32 0 L 0 0 0 32" fill="none" stroke="${titleAccent}" stroke-width="0.5" stroke-opacity="0.08"/>
    </pattern>
  </defs>

  <rect width="1200" height="130" rx="14" fill="#070913"/>
  <rect width="1200" height="130" rx="14" fill="url(#footerBg)"/>
  <rect width="1200" height="130" rx="14" fill="url(#footerGrid)"/>
  ${webAccents}

  <path d="M0,0 L1200,0 L1200,38 C980,68 780,12 560,42 C340,72 160,16 0,44 Z" fill="#0D1117"/>

  <text x="600" y="92" text-anchor="middle" fill="#CBD5E1" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="14" font-weight="500" letter-spacing="0.2">
    ${note}
  </text>

  <rect x="0.75" y="0.75" width="1198.5" height="128.5" rx="13.25" stroke="${titleAccent}" stroke-opacity="0.18" stroke-width="1.5"/>
</svg>
`;
}
