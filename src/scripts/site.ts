import { initMusic } from './audio';
import { bindOceanLifecycle, rememberDisclosures } from './lifecycle';
import { initGallery } from './gallery';
import { OceanEngine } from '../lib/ocean/engine';
import { initMotion } from './motion';
initMotion();
rememberDisclosures();
const root = document.documentElement;
function save(key: string, value: string) { try { localStorage.setItem(key, value); } catch {} }
const themeButton = document.querySelector<HTMLButtonElement>('#theme-toggle');
let engine: OceanEngine | undefined;
function updateTheme() {
  const dark = root.dataset.theme === 'dark';
  themeButton?.setAttribute('aria-label', `Switch to ${dark ? 'light' : 'dark'} theme`);
  themeButton?.setAttribute('title', `Switch to ${dark ? 'light' : 'dark'} theme`);
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#0b0d0c' : '#f7f7f2');
  engine?.setTheme(dark ? 'dark' : 'light');
}
themeButton?.addEventListener('click', () => {
  root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  save('minesh-theme', root.dataset.theme); updateTheme();
});
const canvas = document.querySelector<HTMLCanvasElement>('#ocean');
function initOcean() {
  if (!canvas) return;
  engine?.destroy();
  const mobile = matchMedia('(max-width: 600px)').matches;
  try {
    engine = new OceanEngine(canvas, mobile ? [{kind:'classic',size:1},{kind:'hammerhead',size:.85},{kind:'tiger',size:.75},{kind:'mako',size:.8}] : [{kind:'classic',size:1.15},{kind:'hammerhead',size:1},{kind:'tiger',size:.85},{kind:'classic',size:.9},{kind:'mako',size:.8}], mobile ? 32 : 75);
    updateTheme();
  } catch (error) { console.warn('Ocean unavailable; keeping the static page background.', error); }
}
if (canvas) {
  initOcean();
  matchMedia('(max-width: 600px)').addEventListener('change', initOcean);
}
updateTheme();
bindOceanLifecycle(() => engine);
const music = document.querySelector<HTMLAudioElement>('#bg-music');
if (music) initMusic(music);
initGallery();
document.querySelector<HTMLButtonElement>('.copy-email')?.addEventListener('click', async event => {
  const button = event.currentTarget as HTMLButtonElement;
  const status = document.querySelector('#copy-status');
  try { await navigator.clipboard.writeText(button.dataset.email || ''); if(status)status.textContent = 'Email address copied.'; }
  catch { if(status)status.textContent = 'You can copy the address above or click it to open your email app.'; }
});
