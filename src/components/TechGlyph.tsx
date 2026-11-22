interface TechGlyphProps {
  id: string;
  size?: number;
}

export function TechGlyph({ id, size = 16 }: TechGlyphProps) {
  const key = id.toLowerCase();

  if (key === 'html' || key === 'html5') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 3L5.45 19.3L12 21L18.55 19.3L20 3H4Z" fill="#E34F26" />
        <path d="M12 4.5V19.6L17.3 18.2L18.5 4.5H12Z" fill="#EF652A" />
        <path d="M7.5 8H16.5L16.2 10.5H9.8L10 13H16L15.4 17.2L12 18.2L8.6 17.2L8.4 14.8H10.7L10.8 15.8L12 16.1L13.2 15.8L13.4 14.2H8.2L7.5 8Z" fill="white" />
      </svg>
    );
  }

  if (key === 'css' || key === 'css3') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 3L5.45 19.3L12 21L18.55 19.3L20 3H4Z" fill="#264DE4" />
        <path d="M12 4.5V19.6L17.3 18.2L18.5 4.5H12Z" fill="#2965F1" />
        <path d="M7.5 8H16.5L16.2 10.5H11.5L16 12.2L15.4 17.2L12 18.2L8.6 17.2L8.4 14.8H10.7L10.8 15.8L12 16.1L13.2 15.8L13.5 13.7H8.3L8.1 11.6L12.7 10.2H7.7L7.5 8Z" fill="white" />
      </svg>
    );
  }

  if (key === 'javascript' || key === 'js') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="3" fill="#F7DF1E" />
        <path
          d="M11.2 16.4C11.2 17.6 10.5 18.3 9.3 18.3C8.4 18.3 7.8 17.8 7.5 17.1L8.9 16.2C9.1 16.6 9.3 16.8 9.6 16.8C9.9 16.8 10.1 16.6 10.1 16.1V11.5H11.2V16.4ZM15.1 18.3C13.7 18.3 12.8 17.6 12.4 16.7L13.8 15.9C14.1 16.4 14.5 16.8 15.2 16.8C15.8 16.8 16.1 16.5 16.1 16.1C16.1 15.6 15.7 15.4 14.9 15.1L14.4 14.9C13.2 14.4 12.6 13.8 12.6 12.7C12.6 11.6 13.5 10.8 14.8 10.8C15.8 10.8 16.5 11.2 16.9 12L15.6 12.8C15.3 12.3 15.1 12.1 14.7 12.1C14.3 12.1 14 12.3 14 12.7C14 13.1 14.3 13.3 15 13.6L15.5 13.8C16.9 14.4 17.6 15 17.6 16.1C17.6 17.4 16.6 18.3 15.1 18.3Z"
          fill="#0F172A"
        />
      </svg>
    );
  }

  if (key === 'react') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="2.1" fill="#61DAFB" />
        <ellipse cx="12" cy="12" rx="9" ry="3.6" stroke="#61DAFB" strokeWidth="1.5" />
        <ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(60 12 12)" stroke="#61DAFB" strokeWidth="1.5" />
        <ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(120 12 12)" stroke="#61DAFB" strokeWidth="1.5" />
      </svg>
    );
  }

  if (key === 'nodejs' || key === 'node.js') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 2.5L20 7.1V16.9L12 21.5L4 16.9V7.1L12 2.5Z" fill="#22543D" stroke="#5FA04E" strokeWidth="1.5" />
        <text x="12" y="14.5" textAnchor="middle" fill="#86EFAC" fontSize="7" fontWeight="700" fontFamily="monospace">
          JS
        </text>
      </svg>
    );
  }

  if (key === 'express' || key === 'express.js') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="2.5" y="4.5" width="19" height="15" rx="3" fill="#1E293B" stroke="#94A3B8" strokeWidth="1.3" />
        <text x="12" y="14.5" textAnchor="middle" fill="#F1F5F9" fontSize="8" fontWeight="600" fontFamily="monospace">
          ex
        </text>
      </svg>
    );
  }

  if (key === 'python') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M11.9 3C8.7 3 9 4.4 9 4.4V6.5H12.1V7.2H7.2C7.2 7.2 4.5 6.9 4.5 10.1C4.5 13.3 6.8 13.2 6.8 13.2H8.4V11.2C8.4 11.2 8.3 8.9 10.7 8.9H14.1C14.1 8.9 15.8 8.9 15.8 7.2V4.7C15.8 4.7 16.1 3 11.9 3Z" fill="#3776AB" />
        <path d="M12.1 21C15.3 21 15 19.6 15 19.6V17.5H11.9V16.8H16.8C16.8 16.8 19.5 17.1 19.5 13.9C19.5 10.7 17.2 10.8 17.2 10.8H15.6V12.8C15.6 12.8 15.7 15.1 13.3 15.1H9.9C9.9 15.1 8.2 15.1 8.2 16.8V19.3C8.2 19.3 7.9 21 12.1 21Z" fill="#FFD43B" />
      </svg>
    );
  }

  if (key === 'sql') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <ellipse cx="12" cy="6.5" rx="7" ry="2.8" fill="#3B82F6" fillOpacity="0.25" stroke="#60A5FA" strokeWidth="1.5" />
        <path d="M5 6.5V17.5C5 19.05 8.13 20.3 12 20.3C15.87 20.3 19 19.05 19 17.5V6.5" stroke="#60A5FA" strokeWidth="1.5" />
        <path d="M5 12C5 13.55 8.13 14.8 12 14.8C15.87 14.8 19 13.55 19 12" stroke="#60A5FA" strokeWidth="1.5" />
      </svg>
    );
  }

  if (key === 'prisma') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12.2 3L4.5 15.8L10.8 20.8L19.5 17.8L12.2 3Z" stroke="#A78BFA" strokeWidth="1.6" strokeLinejoin="round" fill="#7C3AED" fillOpacity="0.22" />
        <path d="M12.2 3L10.8 20.8" stroke="#C4B5FD" strokeWidth="1.3" />
      </svg>
    );
  }

  if (key === 'git') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="4.5" y="4.5" width="15" height="15" rx="3" transform="rotate(45 12 12)" fill="#F05032" />
        <circle cx="10" cy="10" r="1.4" fill="white" />
        <circle cx="10" cy="15" r="1.4" fill="white" />
        <circle cx="14.5" cy="12" r="1.4" fill="white" />
        <path d="M10 10V15M10 10L14.5 12" stroke="white" strokeWidth="1.4" />
      </svg>
    );
  }

  if (key === 'github') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className="text-slate-100" aria-hidden="true">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        />
      </svg>
    );
  }

  // VS Code
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M17.5 3.5L21 5.2V18.8L17.5 20.5L9.5 13.5L5.2 16.8L3.2 15.7V8.3L5.2 7.2L9.5 10.5L17.5 3.5Z" fill="#3B82F6" />
      <path d="M17.5 7.2L11.5 12L17.5 16.8V7.2Z" fill="#0F172A" />
    </svg>
  );
}
