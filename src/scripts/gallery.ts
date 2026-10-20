export function initGallery() {
  const dialog = document.querySelector<HTMLDialogElement>('#lightbox');
  const image = document.querySelector<HTMLImageElement>('#lightbox-image');
  if (!dialog || !image) return;
  const photos = Array.from(document.querySelectorAll<HTMLButtonElement>('.gallery-photo'));
  if (!photos.length) return;
  const caption = dialog.querySelector<HTMLElement>('figcaption');
  const counter = dialog.querySelector<HTMLElement>('.lightbox-count');
  const feedback = dialog.querySelector<HTMLElement>('.lightbox-feedback');
  const message = dialog.querySelector<HTMLElement>('.lightbox-message');
  const retry = dialog.querySelector<HTMLButtonElement>('.lightbox-retry');
  const stage = dialog.querySelector<HTMLElement>('.lightbox-stage');
  let current = 0;
  let request = 0;
  let opener: HTMLButtonElement | null = null;
  let loader: HTMLImageElement | undefined;
  const showPhoto = (index: number) => {
    current = (index + photos.length) % photos.length;
    const photo = photos[current];
    const ticket = ++request;
    if (loader) { loader.onload = null; loader.onerror = null; }
    image.hidden = true;
    image.alt = photo.dataset.caption || '';
    image.width = Number(photo.dataset.width);
    image.height = Number(photo.dataset.height);
    stage?.style.setProperty('--photo-aspect', `${image.width} / ${image.height}`);
    if (caption) caption.textContent = image.alt;
    if (counter) counter.textContent = `${current + 1} / ${photos.length}`;
    if (feedback) feedback.hidden = false;
    if (message) message.textContent = 'Loading photograph…';
    if (retry) retry.hidden = true;
    stage?.setAttribute('aria-busy', 'true');
    loader = new Image();
    loader.onload = () => {
      if (ticket !== request) return;
      image.src = photo.dataset.src || '';
      image.hidden = false;
      if (feedback) feedback.hidden = true;
      stage?.setAttribute('aria-busy', 'false');
    };
    loader.onerror = () => {
      if (ticket !== request) return;
      if (message) message.textContent = 'This photograph could not be loaded.';
      if (retry) retry.hidden = false;
      stage?.setAttribute('aria-busy', 'false');
    };
    loader.src = photo.dataset.src || '';
  };
  photos.forEach((photo, index) => photo.addEventListener('click', () => {
    opener = photo; showPhoto(index); dialog.showModal();
  }));
  retry?.addEventListener('click', () => showPhoto(current));
  dialog.querySelector('.lightbox-close')?.addEventListener('click', () => dialog.close());
  dialog.querySelector('.lightbox-prev')?.addEventListener('click', () => showPhoto(current - 1));
  dialog.querySelector('.lightbox-next')?.addEventListener('click', () => showPhoto(current + 1));
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    request++;
    if (loader) { loader.onload = null; loader.onerror = null; }
    opener?.focus();
  });
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight') { event.preventDefault(); showPhoto(current + 1); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); showPhoto(current - 1); }
  });
}
