/** Playback is best-effort: browsers may require interaction before sound. */
export function initMusic(audio: HTMLAudioElement) {
  audio.volume = 0.08;
  let pending = false;
  let wanted = true;
  let resume = false;
  let suspended = false;
  const attempt = () => {
    if (!wanted || pending || suspended || document.hidden || !audio.paused) return;
    pending = true;
    // Keep play synchronous with the gesture; do not await anything first.
    try {
      audio.play().then(() => {
        wanted = false;
        if (suspended || document.hidden) { resume = true; audio.pause(); }
      }, () => { /* A later interaction may retry. */ }).finally(() => { pending = false; });
    } catch { pending = false; }
  };
  const pause = () => { resume = resume || !audio.paused || pending; audio.pause(); };
  const restore = () => { if (resume) { wanted = true; resume = false; } attempt(); };
  document.addEventListener('click', attempt);
  document.addEventListener('keydown', attempt);
  document.addEventListener('touchend', attempt, { passive: true });
  document.addEventListener('visibilitychange', () => { if (document.hidden) pause(); else restore(); });
  window.addEventListener('pagehide', () => { suspended = true; pause(); });
  window.addEventListener('pageshow', () => { suspended = false; restore(); });
  attempt();
}
