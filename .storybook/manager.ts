import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';
import { GLOBALS_UPDATED } from 'storybook/internal/core-events';
import './manager.css';

const PAGE_TITLE = 'React Components';
const LOGO_URL = './pastweb.svg';

type ThemeMode = 'light' | 'dark';

type GlobalsPayload = {
  globals?: {
    theme?: string;
  };
};

let brandTitle = 'PastWeb';
let currentMode: ThemeMode = 'dark';

const applyThemeMode = (theme?: string, nextBrandTitle?: string) => {
  const mode: ThemeMode = theme === 'light' ? 'light' : 'dark';

  if (nextBrandTitle !== undefined) {
    brandTitle = nextBrandTitle;
  }

  currentMode = mode;
  document.documentElement.classList.remove('light', 'dark');
  document.documentElement.classList.add(mode);

  addons.setConfig({
    theme: create({
      base: mode,
      brandTitle,
      brandUrl: './',
      brandTarget: '_self',
      brandImage: null as unknown as string,
    }),
  });
};

const setDocumentTitle = () => {
  if (document.title !== PAGE_TITLE) {
    document.title = PAGE_TITLE;
  }
};

applyThemeMode('dark');
setDocumentTitle();

const titleElement = document.querySelector('title');

if (titleElement) {
  new MutationObserver(setDocumentTitle).observe(titleElement, {
    childList: true,
    characterData: true,
    subtree: true,
  });
}

fetch(LOGO_URL)
  .then(response => response.text())
  .then(svg => {
    const markup = svg.replace(/^<\?xml[^>]*>\s*/i, '');
    applyThemeMode(
      currentMode,
      `<i class="pastweb-logo">${markup}</i><span class="pastweb-brand-name">PastWeb</span>`,
    );
  });

addons.register('pastweb/theme', () => {
  addons.getChannel().on(GLOBALS_UPDATED, ({ globals }: GlobalsPayload) => {
    applyThemeMode(globals?.theme);
  });
});
