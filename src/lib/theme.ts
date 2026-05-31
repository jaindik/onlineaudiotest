export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';

export function getStoredTheme(): Theme | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === 'light' || stored === 'dark' ? stored : null;
  } catch {
    return null;
  }
}

export function getSystemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function getTheme(): Theme {
  return getStoredTheme() ?? getSystemTheme();
}

export function applyTheme(theme: Theme) {
  document.documentElement.setAttribute('data-theme', theme);
  document.documentElement.style.colorScheme = theme;

  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute('content', theme === 'dark' ? '#0a0a0a' : '#ffffff');
  }

  window.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
}

export function setTheme(theme: Theme) {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* private browsing */
  }
  applyTheme(theme);
}

export function toggleTheme(): Theme {
  const next: Theme = getTheme() === 'dark' ? 'light' : 'dark';
  setTheme(next);
  return next;
}

function updateToggleButton(btn: HTMLElement, theme: Theme) {
  btn.setAttribute(
    'aria-label',
    theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode',
  );
  btn.setAttribute('title', theme === 'dark' ? 'Light mode' : 'Dark mode');
}

export function initThemeToggle() {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;

  updateToggleButton(btn, getTheme());

  btn.addEventListener('click', () => {
    updateToggleButton(btn, toggleTheme());
  });

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!getStoredTheme()) {
      const theme: Theme = e.matches ? 'dark' : 'light';
      applyTheme(theme);
      updateToggleButton(btn, theme);
    }
  });
}
