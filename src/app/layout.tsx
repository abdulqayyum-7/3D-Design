import "./globals.css";
import { APP_DISPLAY_NAME } from "./config/brand";

export const metadata = {
  title: APP_DISPLAY_NAME,
  description: "AI-powered clinical exam preparation for FCPS-1 and JCAT (MDMS)",
};

// Applies the dark + violet theme before first paint so there's no flash of
// the light/blue defaults baked into theme.css while React hydrates.
const THEME_INIT_SCRIPT = `
(function () {
  try {
    var root = document.documentElement;
    root.classList.add('dark');
    var vars = {
      '--color-primary-50': '#f5f3ff', '--color-primary-100': '#ede9fe',
      '--color-primary-200': '#ddd6fe', '--color-primary-300': '#c4b5fd',
      '--color-primary-400': '#a78bfa', '--color-primary-500': '#8b5cf6',
      '--color-primary-600': '#7c3aed', '--color-primary-700': '#6d28d9',
      '--color-primary-800': '#5b21b6', '--color-primary-900': '#4c1d95',
      '--color-primary-400-rgb': '167, 139, 250', '--color-primary-500-rgb': '139, 92, 246',
      '--app-bg': '#09090b', '--app-surface': '#18181b', '--app-elevated': '#27272a',
      '--app-text': '#fafafa', '--app-muted': '#a1a1aa', '--app-border': '#27272a',
      '--mkt-bg': '#021018', '--mkt-bg-elevated': '#0f1a1f',
      '--mkt-text': '#f6fbfa', '--mkt-text-muted': '#9aa6a3', '--mkt-border': '#1c2b30',
      '--mkt-accent': '#7c3aed', '--mkt-accent-hover': '#6d28d9', '--mkt-accent-muted': '#8b5cf6'
    };
    for (var k in vars) root.style.setProperty(k, vars[k]);
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
