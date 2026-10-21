import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

function events(extra = {}) {
  const handlers = new Map();
  return { ...extra,
    addEventListener(name, fn) { const list = handlers.get(name) || []; list.push(fn); handlers.set(name, list); },
    emit(name, event = {}) { for (const fn of handlers.get(name) || []) fn(event); },
  };
}
function load(name, context) {
  const scope = { exports: {}, cancelAnimationFrame() {}, ...context };
  vm.runInNewContext(ts.transpileModule(readFileSync(`src/scripts/${name}.ts`, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText, scope);
  return scope.exports;
}


test('anchor clearance follows real header size on initial load, resize, and cache restore', () => {
  let height = 74, clearance, resize;
  const header = { getBoundingClientRect: () => ({ height }) };
  const window = events();
  const document = events({ querySelector: () => header, querySelectorAll: () => [],
    documentElement: { style: { setProperty: (_name, value) => { clearance = value; } } } });
  const { initMotion } = load('motion', { window, document,
    ResizeObserver: class { constructor(fn) { resize = fn; } observe() {} disconnect() {} } });
  initMotion();
  assert.equal(clearance, '90px');
  height = 92; resize();
  assert.equal(clearance, '108px');
  window.emit('pagehide', { persisted: true });
  height = 74; window.emit('pageshow', { persisted: true });
  assert.equal(clearance, '90px');
});

test('repeated cached returns reconnect only unrevealed content', () => {
  let notify;
  const observed = new Set(), animations = [];
  const element = id => ({ closest: () => null, getBoundingClientRect: () => ({ top: 1000 }),
    animate: () => animations.push(id) });
  const first = element('first'), second = element('second');
  const window = events({ innerHeight: 800, IntersectionObserver: true });
  const document = events({ querySelector: () => null, querySelectorAll: () => [first, second] });
  const { initMotion } = load('motion', { window, document,
    IntersectionObserver: class {
      constructor(fn) { notify = fn; }
      observe(el) { observed.add(el); } unobserve(el) { observed.delete(el); } disconnect() { observed.clear(); }
    } });
  initMotion();
  notify([{ target: first, isIntersecting: true, boundingClientRect: { bottom: 700 } }]);
  for (let i = 0; i < 3; i++) {
    window.emit('pagehide', { persisted: true }); assert.equal(observed.size, 0);
    window.emit('pageshow', { persisted: true }); assert.deepEqual([...observed], [second]);
  }
  assert.deepEqual(animations, ['first']);
});

test('cached navigation pauses and resumes the same ocean, destroying only on final departure', () => {
  const window = events(), states = [];
  const ocean = { setPaused: state => states.push(state), destroy: () => states.push('destroy') };
  load('lifecycle', { window }).bindOceanLifecycle(() => ocean);
  for (let i = 0; i < 3; i++) { window.emit('pagehide', { persisted: true }); window.emit('pageshow', { persisted: true }); }
  assert.deepEqual(states, [true, false, true, false, true, false]);
  window.emit('pagehide', { persisted: false });
  assert.equal(states.at(-1), 'destroy');
});

test('uncached Back restores disclosures but a fresh visit does not', () => {
  const window = events(), details = [{ open: true }, { open: false }], saved = new Map();
  let type = 'navigate';
  const context = { window, document: { querySelectorAll: () => details }, location: { pathname: '/' },
    performance: { getEntriesByType: () => [{ type }] },
    sessionStorage: { getItem: key => saved.get(key), setItem: (key, value) => saved.set(key, value) } };
  load('lifecycle', context).rememberDisclosures();
  window.emit('pagehide');
  details[0].open = false;
  load('lifecycle', context).rememberDisclosures();
  assert.equal(details[0].open, false);
  type = 'back_forward';
  load('lifecycle', context).rememberDisclosures();
  assert.equal(details[0].open, true);
  assert.equal(details[1].open, false);
});

test('gallery handles stale success/error, retry, reserved dimensions, and closing focus', () => {
  const image = { hidden: true }, loaders = [];
  const node = () => events({ hidden: false, textContent: '', style: { setProperty() {} }, setAttribute() {} });
  const caption = node(), counter = node(), feedback = node(), message = node(), retry = node(), stage = node();
  const next = node(), prev = node(), close = node();
  const children = new Map([['figcaption', caption], ['.lightbox-count', counter], ['.lightbox-feedback', feedback],
    ['.lightbox-message', message], ['.lightbox-retry', retry], ['.lightbox-stage', stage],
    ['.lightbox-next', next], ['.lightbox-prev', prev], ['.lightbox-close', close]]);
  let focus = 0;
  const photos = [0, 1].map(i => events({ dataset: { src: `${i}.webp`, caption: `Photo ${i}`, width: '1080', height: '810' }, focus: () => focus++ }));
  const dialog = events({ querySelector: key => children.get(key), showModal() {}, close() { this.emit('close'); } });
  const document = { querySelector: key => key === '#lightbox' ? dialog : image, querySelectorAll: () => photos };
  class Image { constructor() { loaders.push(this); } }
  load('gallery', { document, Image }).initGallery();
  photos[0].emit('click');
  assert.equal(counter.textContent, '1 / 2'); assert.equal(image.width, 1080); assert.equal(image.height, 810);
  assert.equal(image.hidden, true); assert.equal(message.textContent, 'Loading photograph…');
  const staleSuccess = loaders[0].onload, staleError = loaders[0].onerror;
  next.emit('click'); staleSuccess(); staleError();
  assert.equal(counter.textContent, '2 / 2'); assert.equal(image.hidden, true); assert.equal(retry.hidden, true);
  loaders[1].onerror(); assert.equal(retry.hidden, false);
  retry.emit('click'); assert.equal(retry.hidden, true);
  loaders[2].onload(); assert.equal(image.src, '1.webp'); assert.equal(feedback.hidden, true);
  prev.emit('click'); assert.equal(counter.textContent, '1 / 2');
  const afterClose = loaders[3].onload;
  close.emit('click'); afterClose(); assert.equal(image.hidden, true); assert.equal(focus, 1);
});
