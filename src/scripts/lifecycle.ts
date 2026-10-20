interface OceanLifecycle { setPaused(paused: boolean): void; destroy(): void; }

export function bindOceanLifecycle(getEngine: () => OceanLifecycle | undefined) {
  window.addEventListener('pagehide', event => {
    if (event.persisted) getEngine()?.setPaused(true);
    else getEngine()?.destroy();
  });
  window.addEventListener('pageshow', event => {
    if (event.persisted) getEngine()?.setPaused(false);
  });
}

/** Keep disclosures when the browser cannot retain the document in its cache. */
export function rememberDisclosures() {
  const disclosures = Array.from(document.querySelectorAll<HTMLDetailsElement>('main details'));
  if (!disclosures.length) return;
  const key = `minesh-disclosures:${location.pathname}`;
  const restore = () => {
    try {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
      if (navigation?.type !== 'back_forward') return;
      const state: unknown = JSON.parse(sessionStorage.getItem(key) || 'null');
      if (Array.isArray(state)) disclosures.forEach((detail, index) => { detail.open = state[index] === true; });
    } catch { /* Navigation still works when session storage is unavailable. */ }
  };
  restore();
  window.addEventListener('pagehide', () => {
    try { sessionStorage.setItem(key, JSON.stringify(disclosures.map(detail => detail.open))); } catch {}
  });
}
