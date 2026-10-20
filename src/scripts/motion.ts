/** Gentle, one-time text entrances; content stays visible if scripting fails. */
export function initMotion() {
  const header = document.querySelector<HTMLElement>('.site-header');
  const updateClearance = () => {
    if (header) document.documentElement.style.setProperty('--anchor-clearance', `${header.getBoundingClientRect().height + 16}px`);
  };
  updateClearance();
  const headerObserver = header ? new ResizeObserver(updateClearance) : undefined;
  if (header) headerObserver?.observe(header);
  window.addEventListener('pagehide', () => headerObserver?.disconnect());
  window.addEventListener('pageshow', () => { updateClearance(); if (header) headerObserver?.observe(header); });
  if ('IntersectionObserver' in window) {
    const pending = new Set<Element>();
    const observer = new IntersectionObserver(entries => {
      let order = 0;
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const element = entry.target as HTMLElement;
        pending.delete(element);
        observer.unobserve(element);
        // Don't animate content that has already passed above the viewport.
        if (entry.boundingClientRect.bottom < 0) continue;
        element.animate([
          { opacity: 0, transform: 'translateY(16px)' },
          { opacity: 1, transform: 'translateY(0)' },
        ], {
          duration: 850,
          delay: Math.min(order++ * 65, 195),
          easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
          fill: 'backwards',
        });
      }
    }, { threshold: 0, rootMargin: '0px 0px -24px 0px' });

    document.querySelectorAll('main h1, main h2, main h3, main p:not(details p), main .experience-list, main .hero-actions, main .about-copy .text-link, .toolkit-panel')
      .forEach(element => {
        // Reveal each toolkit panel as one piece instead of animating its text twice.
        if (element.closest('.toolkit-panel') && !element.matches('.toolkit-panel')) return;
        // The browser may already have painted this text (or restored a scroll
        // position). Never move visible content backwards into an entrance.
        // Hero text has a CSS entrance from first paint; don't replay it here.
        if (!element.closest('.hero-content') && element.getBoundingClientRect().top >= window.innerHeight) {
          pending.add(element);
          observer.observe(element);
        }
      });
    window.addEventListener('pagehide', () => observer.disconnect());
    window.addEventListener('pageshow', event => {
      if (event.persisted) pending.forEach(element => observer.observe(element));
    });
  }

  let frame = 0;
  const cancel = () => { cancelAnimationFrame(frame); frame = 0; };
  // Touch, wheel and keyboard input always take control immediately.
  window.addEventListener('wheel', cancel, { passive: true });
  window.addEventListener('touchstart', cancel, { passive: true });
  window.addEventListener('keydown', cancel);
  window.addEventListener('pagehide', cancel);
  window.addEventListener('popstate', cancel);

  document.addEventListener('click', event => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = (event.target as Element).closest<HTMLAnchorElement>('a[href]');
    if (!link || link.download || (link.target && link.target !== '_self')) return;
    const url = new URL(link.href);
    if (url.origin !== location.origin || url.pathname !== location.pathname || url.search !== location.search || !url.hash) return;
    let id: string;
    try { id = decodeURIComponent(url.hash.slice(1)); } catch { return; }
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    cancel();
    const start = window.scrollY;
    const padding = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
    const end = Math.max(0, Math.min(start + target.getBoundingClientRect().top - padding,
      document.documentElement.scrollHeight - window.innerHeight));
    const duration = Math.min(1200, Math.max(550, Math.abs(end - start) * 0.3));
    const started = performance.now();
    if (location.hash !== url.hash) history.pushState(null, '', url.hash);
    // Pointer navigation keeps focus on the link, rather than outlining a whole
    // section. Keyboard navigation and the skip link still move focus forward.
    if (event.detail === 0 || link.matches('.skip-link')) {
      const temporaryTabIndex = !target.hasAttribute('tabindex') && target.tabIndex < 0;
      if (temporaryTabIndex) target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
      if (temporaryTabIndex) target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
    }
    const tick = (now: number) => {
      const progress = Math.min(1, (now - started) / duration);
      const eased = 1 - Math.pow(1 - progress, 4);
      window.scrollTo({ top: start + (end - start) * eased, behavior: 'instant' });
      frame = progress < 1 ? requestAnimationFrame(tick) : 0;
    };
    frame = requestAnimationFrame(tick);
  });
}
