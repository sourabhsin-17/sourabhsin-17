import { TECH_STACK, THEME_PRESETS } from '../data/defaultConfig';
import { ReadmeConfig } from '../types/readme';

function encodeTypingLines(lines: string[]): string {
  return lines
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => encodeURIComponent(line))
    .join(';');
}

function getTechBadgeMarkdown(techName: string, primaryHex: string): string {
  const matched = TECH_STACK.find(
    (t) => t.name.toLowerCase() === techName.toLowerCase() || t.id === techName.toLowerCase()
  );
  if (!matched) {
    return `![${techName}](https://img.shields.io/badge/${encodeURIComponent(techName)}-1E293B?style=flat-square&labelColor=${primaryHex})`;
  }
  return `![${matched.name}](https://img.shields.io/badge/${encodeURIComponent(matched.name)}-0F172A?style=for-the-badge&logo=${matched.logo}&logoColor=${matched.logoColor})`;
}

function getSmallTechBadge(techName: string): string {
  const matched = TECH_STACK.find(
    (t) => t.name.toLowerCase() === techName.toLowerCase() || t.id === techName.toLowerCase()
  );
  if (!matched) {
    return `![${techName}](https://img.shields.io/badge/${encodeURIComponent(techName)}-1E293B?style=flat-square)`;
  }
  return `![${matched.name}](https://img.shields.io/badge/${encodeURIComponent(matched.name)}-161B22?style=flat-square&logo=${matched.logo}&logoColor=${matched.logoColor})`;
}

export function generateReadmeMarkdown(config: ReadmeConfig): string {
  const theme = THEME_PRESETS[config.themeId];
  const username = config.username.trim() || 'sourabhsin-17';
  const blocks: string[] = [];

  // 1. Animated Themed Banner
  if (config.sections.banner) {
    if (config.bannerMode === 'repo-svg') {
      blocks.push(`<div align="center">
  <img src="./banner.svg" width="100%" alt="${config.name} Banner" />
</div>`);
    } else {
      const bannerTitle = encodeURIComponent(config.name.trim() || 'Sourabh Singh');
      const bannerDesc = encodeURIComponent(config.bannerSubtitle.trim() || config.focus);
      blocks.push(`<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:${theme.gradientStart},100:${theme.gradientEnd}&height=200&section=header&text=${bannerTitle}&fontSize=44&fontColor=F8FAFC&fontAlignY=40&desc=${bannerDesc}&descSize=16&descAlignY=62" width="100%" alt="${config.name} Banner" />
</div>`);
    }
  }

  // 2. Typing SVG Intro
  if (config.sections.typing && config.typingLines.some((l) => l.trim().length > 0)) {
    const encodedLines = encodeTypingLines(config.typingLines);
    blocks.push(`<div align="center">
  <a href="https://github.com/${username}">
    <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=20&duration=3200&pause=900&color=${theme.statsTitleHex}&center=true&vCenter=true&width=640&lines=${encodedLines}" alt="Typing Animation" />
  </a>
</div>`);
  }

  // 3. About Me (with optional 2-column Avatar layout)
  if (config.sections.about) {
    if (config.sections.avatarInAbout) {
      blocks.push(`---

## About Me

<table width="100%">
  <tr>
    <td width="170" align="center" valign="middle">
      <img src="./avatar.jpg" width="140" alt="${config.name} Avatar" /><br /><br />
      <sub><strong>@${username}</strong><br />${config.location.trim()}</sub>
    </td>
    <td valign="top">
      <p>${config.introSummary.trim()}</p>
      <ul>
        <li><strong>Current Focus:</strong> ${config.focus.trim()}</li>
        <li><strong>Interests:</strong> ${config.interests.trim()}</li>
        <li><strong>Location:</strong> ${config.location.trim()}</li>
        <li><strong>GitHub:</strong> <a href="https://github.com/${username}">github.com/${username}</a></li>
      </ul>
    </td>
  </tr>
</table>`);
    } else {
      blocks.push(`---

## About Me

${config.introSummary.trim()}

- **Location:** ${config.location.trim()}
- **Current Focus:** ${config.focus.trim()}
- **Interests:** ${config.interests.trim()}
- **GitHub:** [@${username}](https://github.com/${username})`);
    }
  }

  // 4. Technologies & Skills (Working with & Learning)
  if (config.sections.techStack) {
    if (config.techStyle === 'skillicons') {
      const iconIds = TECH_STACK.map((t) => t.skillIconId).join(',');
      blocks.push(`---

## Technologies & Tools I'm Working With

> *Actively building projects and deepening my fundamentals across these tools.*

<div align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=${iconIds}&theme=dark&perline=6" alt="Technologies and Tools" />
  </a>
</div>`);
    } else {
      const frontend = TECH_STACK.filter((t) => t.category === 'Frontend')
        .map((t) => getTechBadgeMarkdown(t.name, theme.primaryHex))
        .join('\n  ');
      const backend = TECH_STACK.filter((t) => t.category === 'Backend & Data')
        .map((t) => getTechBadgeMarkdown(t.name, theme.primaryHex))
        .join('\n  ');
      const tools = TECH_STACK.filter((t) => t.category === 'Tools & Workflow')
        .map((t) => getTechBadgeMarkdown(t.name, theme.primaryHex))
        .join('\n  ');

      blocks.push(`---

## Technologies & Tools I'm Working With

> *Actively building projects and deepening my fundamentals across these tools.*

<div align="center">

**Frontend**

  ${frontend}

**Backend & Data**

  ${backend}

**Tools & Workflow**

  ${tools}

</div>`);
    }
  }

  // 5. Featured Projects
  if (config.sections.projects && config.projects.length > 0) {
    if (config.projectLayout === 'grid') {
      const rows = config.projects
        .map((project) => {
          const badges = project.technologies.map((tech) => getSmallTechBadge(tech)).join(' ');
          const repoLink = project.repoUrl.trim()
            ? `<br /><br /><a href="${project.repoUrl.trim()}"><img src="https://img.shields.io/badge/View_Repository-${theme.primaryHex}?style=flat-square&logo=github&logoColor=white" alt="View ${project.name} Repository" /></a>`
            : '';

          return `  <tr>
    <td width="32%" valign="top">
      <strong>${project.name}</strong><br />
      <sub>${project.tagline}</sub>
    </td>
    <td width="68%" valign="top">
      ${project.description}<br /><br />
      ${badges}${repoLink}
    </td>
  </tr>`;
        })
        .join('\n');

      blocks.push(`---

## Featured Projects

<table width="100%">
${rows}
</table>`);
    } else {
      const cards = config.projects
        .map((project) => {
          const badges = project.technologies.map((tech) => getSmallTechBadge(tech)).join(' ');
          const repoLine = project.repoUrl.trim()
            ? `\n\n[![View Repository](https://img.shields.io/badge/View_Repository-${theme.primaryHex}?style=flat-square&logo=github&logoColor=white)](${project.repoUrl.trim()})`
            : '';

          return `### ${project.name}
*${project.tagline}*

${project.description}

${badges}${repoLine}`;
        })
        .join('\n\n');

      blocks.push(`---

## Featured Projects

${cards}`);
    }
  }

  // 6. GitHub Analytics
  const hasAnyStats =
    config.sections.stats ||
    config.sections.streak ||
    config.sections.languages ||
    config.sections.activityGraph;

  if (hasAnyStats) {
    const statCards: string[] = [];

    if (config.sections.stats) {
      statCards.push(
        `  <img src="https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&bg_color=0D1117&title_color=${theme.statsTitleHex}&icon_color=${theme.statsIconHex}&text_color=E2E8F0&border_color=1E293B&hide_border=false" height="170" alt="${username} GitHub Stats" />`
      );
    }

    if (config.sections.languages) {
      statCards.push(
        `  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&bg_color=0D1117&title_color=${theme.statsTitleHex}&text_color=E2E8F0&border_color=1E293B&hide_border=false" height="170" alt="${username} Top Languages" />`
      );
    }

    const topRow =
      statCards.length > 0
        ? `<div align="center">\n${statCards.join('\n')}\n</div>`
        : '';

    const streakBlock = config.sections.streak
      ? `\n\n<div align="center">\n  <img src="https://streak-stats.demolab.com?user=${username}&background=0D1117&border=1E293B&stroke=${theme.primaryHex}&ring=${theme.secondaryHex}&fire=${theme.statsIconHex}&currStreakLabel=${theme.statsTitleHex}&sideLabels=CBD5E1&currStreakNum=F8FAFC&sideNums=F8FAFC&dates=94A3B8" alt="${username} GitHub Streak" />\n</div>`
      : '';

    const graphBlock = config.sections.activityGraph
      ? `\n\n<div align="center">\n  <img src="https://github-readme-activity-graph.vercel.app/graph?username=${username}&bg_color=0D1117&color=${theme.statsTitleHex}&line=${theme.primaryHex}&point=${theme.statsIconHex}&area=true&hide_border=false&border_color=1E293B" width="100%" alt="${username} Contribution Graph" />\n</div>`
      : '';

    blocks.push(`---

## GitHub Activity & Statistics

${topRow}${streakBlock}${graphBlock}`);
  }

  // 7. Social & Contact Section
  if (config.sections.connect) {
    const contactBadges: string[] = [
      `  <a href="https://github.com/${username}">
    <img src="https://img.shields.io/badge/GitHub-${username}-0F172A?style=for-the-badge&logo=github&logoColor=F8FAFC" alt="GitHub" />
  </a>`,
    ];

    if (config.showEmail && config.email.trim()) {
      contactBadges.push(
        `  <a href="mailto:${config.email.trim()}">
    <img src="https://img.shields.io/badge/Email-Contact_Me-${theme.primaryHex}?style=for-the-badge&logo=gmail&logoColor=white" alt="Email" />
  </a>`
      );
    }

    if (config.linkedinUrl.trim()) {
      contactBadges.push(
        `  <a href="${config.linkedinUrl.trim()}">
    <img src="https://img.shields.io/badge/LinkedIn-Connect-1D4ED8?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />
  </a>`
      );
    }

    if (config.portfolioUrl.trim()) {
      contactBadges.push(
        `  <a href="${config.portfolioUrl.trim()}">
    <img src="https://img.shields.io/badge/Portfolio-Visit_Site-${theme.secondaryHex}?style=for-the-badge&logo=vercel&logoColor=white" alt="Portfolio" />
  </a>`
      );
    }

    blocks.push(`---

## Connect With Me

<div align="center">

${contactBadges.join('\n')}

</div>`);
  }

  // 8. Stylish Footer
  if (config.sections.footer) {
    if (config.bannerMode === 'repo-svg') {
      blocks.push(`---

<div align="center">
  <img src="./footer.svg" width="100%" alt="Footer Wave" />
</div>`);
    } else {
      blocks.push(`---

<div align="center">
  <p><sub>${config.footerNote.trim()}</sub></p>
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:${theme.gradientStart},100:${theme.gradientEnd}&height=100&section=footer" width="100%" alt="Footer Wave" />
</div>`);
    }
  }

  return blocks.join('\n\n') + '\n';
}
