import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('dist');
const home = await readFile(path.join(root, 'index.html'), 'utf8');
const gallery = await readFile(path.join(root, 'photography/index.html'), 'utf8');

test('all local page assets and anchor destinations resolve', async () => {
  const pages = [home, gallery];
  for (const html of pages) {
    for (const match of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
      const href = match[1];
      if (href.startsWith('#')) {
        assert.ok(html.includes(`id="${href.slice(1)}"`), `Missing anchor ${href}`);
      } else if (href.startsWith('/')) {
        const [pathname, anchor] = href.split('#');
        const file = path.join(root, pathname.endsWith('/') ? `${pathname}index.html` : pathname);
        await access(file);
        if (anchor) {
          const target = await readFile(file, 'utf8');
          assert.ok(target.includes(`id="${anchor}"`), `Missing destination ${href}`);
        }
      }
    }
  }
});

test('professional content and all four project destinations are present', () => {
  for (const text of ['NoteStack.AI','DropDox','Chequers9','Architectural Walkthrough','Cognizant','Jul 2026']) {
    assert.ok(home.includes(text), `Missing ${text}`);
  }
  for (const url of [
    'https://notestack-ai.101mineshrajput.workers.dev/',
    'https://drop-dox-app.vercel.app',
    'https://chequers9architects.com/',
    'https://architectural-walkthrough-demo.101mineshrajput.workers.dev/',
  ]) assert.ok(home.includes(url));
});

test('resume is a real PDF and social image exists', async () => {
  const pdf = await readFile(path.join(root, 'Minesh-Rajput-Resume.pdf'));
  assert.equal(pdf.subarray(0,5).toString(), '%PDF-');
  const png = await readFile(path.join(root, 'social-card.png'));
  assert.equal(png.subarray(1,4).toString(), 'PNG');
});

test('gallery has descriptive images and native dialog controls', () => {
  const images = [...gallery.matchAll(/<img\b[^>]*>/g)].filter(([tag]) => !tag.includes('lightbox-image'));
  assert.ok(images.length >= 30);
  for (const [image] of images) {
    assert.match(image, /alt="[^"]+"/);
    assert.match(image, /width="\d+"/);
    assert.match(image, /height="\d+"/);
  }
  assert.match(gallery, /<dialog[^>]+id="lightbox"/);
  assert.ok(gallery.includes('aria-label="Close photograph"'));
  assert.ok(!home.includes('id="motion-toggle"'));
  assert.ok(home.includes('id="theme-toggle"'));
});
