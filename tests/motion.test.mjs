import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

test('section clicks retain link focus; keyboard navigation moves focus to the destination', () => {
  let click, focused = 0;
  const target = {
    tabIndex: -1, hasAttribute: () => false, setAttribute() {}, addEventListener() {},
    getBoundingClientRect: () => ({ top: 200 }), focus: () => focused++,
  };
  const link = { href: 'https://example.com/#top', target: '', matches: () => false };
  const context = {
    exports: {}, URL,
    window: { scrollY: 0, innerHeight: 800, addEventListener() {} },
    document: { querySelector: () => null, documentElement: { scrollHeight: 2000 }, getElementById: () => target,
      addEventListener: (name, callback) => { if (name === 'click') click = callback; } },
    location: { origin: 'https://example.com', pathname: '/', search: '', hash: '' },
    history: { pushState() {} }, getComputedStyle: () => ({ scrollPaddingTop: '110px' }),
    performance: { now: () => 0 }, cancelAnimationFrame() {}, requestAnimationFrame: () => 1,
  };
  vm.runInNewContext(ts.transpileModule(readFileSync('src/scripts/motion.ts', 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText, context);
  context.exports.initMotion();
  const event = { button: 0, detail: 1, target: { closest: () => link }, preventDefault() {} };
  click(event);
  assert.equal(focused, 0, 'A pointer click must not focus and outline the entire section');
  click({ ...event, detail: 0 });
  assert.equal(focused, 1, 'Keyboard activation must still move focus to the destination');
});

test('initial and restored viewport content stays still; new content reveals once', () => {
  const animations = [];
  const observed = new Set();
  const element = top => ({
    closest: () => null,
    getBoundingClientRect: () => ({ top, bottom: top + 100 }),
    animate: () => animations.push(top),
  });
  const initial = element(100), above = element(-200), below = element(1000);
  let notify;
  const context = {
    exports: {},
    window: { innerHeight: 800, addEventListener() {} },
    document: { querySelector: () => null, querySelectorAll: () => [initial, above, below], addEventListener() {} },
    IntersectionObserver: class {
      constructor(callback) { notify = callback; }
      observe(target) { observed.add(target); }
      unobserve(target) { observed.delete(target); }
      disconnect() {}
    },
  };
  context.window.IntersectionObserver = context.IntersectionObserver;
  vm.runInNewContext(ts.transpileModule(readFileSync('src/scripts/motion.ts', 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText, context);
  context.exports.initMotion();
  assert.equal(observed.has(initial), false, 'Visible text must not jump into a delayed reveal on load/refresh');
  assert.equal(observed.has(above), false, 'Content above a restored scroll position must stay revealed');
  assert.equal(observed.has(below), true);
  notify([{ target: below, isIntersecting: true, boundingClientRect: { top: 700, bottom: 800 } }]);
  assert.deepEqual(animations, [1000]);
  assert.equal(observed.size, 0);
});
