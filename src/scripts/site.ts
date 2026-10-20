import { OceanEngine } from '../lib/ocean/engine';
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
window.addEventListener('pagehide', () => engine?.destroy(), {once:true});
window.addEventListener('pageshow', event => { if (event.persisted) location.reload(); });
document.querySelector<HTMLButtonElement>('.copy-email')?.addEventListener('click', async event => {
  const button = event.currentTarget as HTMLButtonElement;
  const status = document.querySelector('#copy-status');
  try { await navigator.clipboard.writeText(button.dataset.email || ''); if(status)status.textContent = 'Email address copied.'; }
  catch { if(status)status.textContent = 'You can copy the address above or click it to open your email app.'; }
});
const dialog = document.querySelector<HTMLDialogElement>('#lightbox');
const photos = [...document.querySelectorAll<HTMLButtonElement>('.gallery-photo')];
let current = 0;
let opener: HTMLButtonElement | null = null;
function showPhoto(index: number) {
  current = (index + photos.length) % photos.length;
  const photo = photos[current];
  const image = document.querySelector<HTMLImageElement>('#lightbox-image');
  const caption = document.querySelector('#lightbox-caption');
  if(image){ image.src = photo.dataset.src || ''; image.alt = photo.dataset.caption || ''; }
  if(caption)caption.textContent = `${current + 1} / ${photos.length} — ${photo.dataset.caption}`;
}
photos.forEach((photo,index) => photo.addEventListener('click', () => { opener=photo; showPhoto(index); dialog?.showModal(); }));
dialog?.querySelector('.lightbox-close')?.addEventListener('click', () => dialog.close());
dialog?.querySelector('.lightbox-prev')?.addEventListener('click', () => showPhoto(current - 1));
dialog?.querySelector('.lightbox-next')?.addEventListener('click', () => showPhoto(current + 1));
dialog?.addEventListener('click', event => { if(event.target===dialog) { const rect=dialog.getBoundingClientRect(); if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close(); } });
dialog?.addEventListener('close', () => opener?.focus());
dialog?.addEventListener('keydown', event => { if(event.key === 'ArrowRight'){event.preventDefault();showPhoto(current+1);} if(event.key === 'ArrowLeft'){event.preventDefault();showPhoto(current-1);} });
