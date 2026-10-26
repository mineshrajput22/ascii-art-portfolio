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

function metadata(html, key, value) {
  const tag = [...html.matchAll(/<meta\b[^>]*>/g)].map(([tag]) => tag)
    .find(tag => tag.includes(`${key}="${value}"`));
  return tag?.match(/content="([^"]*)"/)?.[1];
}

function canonical(html) {
  return html.match(/<link\b[^>]*rel="canonical"[^>]*href="([^"]+)"/)?.[1];
}

function schema(html) {
  const scripts = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
  assert.equal(scripts.length, 1, 'Exactly one structured-data graph per page');
  return JSON.parse(scripts[0][1]);
}

test('pages have unique server-rendered SEO metadata and canonical URLs', () => {
  const titles = new Set(), descriptions = new Set();
  for (const [html, url] of [[home, 'https://minesh.site/'], [gallery, 'https://minesh.site/photography/']]) {
    const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
    assert.ok(title?.includes('Minesh Rajput'));
    const description = metadata(html, 'name', 'description');
    assert.ok(description && description.length > 70);
    titles.add(title); descriptions.add(description);
    assert.equal(canonical(html), url);
    assert.equal((html.match(/rel="canonical"/g) || []).length, 1);
    assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1);
    assert.equal(metadata(html, 'name', 'author'), 'Minesh Rajput');
    assert.equal(metadata(html, 'name', 'robots'), 'index, follow, max-image-preview:large');
    assert.ok(!html.includes('http://localhost') && !html.includes('http://127.0.0.1'));
  }
  assert.equal(titles.size, 2);
  assert.equal(descriptions.size, 2);
  assert.ok(metadata(home, 'name', 'description').includes('Kolhapur, India'));
});

test('social cards have matching titles, descriptions, and real image dimensions', async () => {
  const png = await readFile(path.join(root, 'social-card.png'));
  for (const html of [home, gallery]) {
    assert.equal(metadata(html, 'property', 'og:url'), canonical(html));
    assert.equal(metadata(html, 'property', 'og:description'), metadata(html, 'name', 'description'));
    assert.equal(metadata(html, 'name', 'twitter:title'), metadata(html, 'property', 'og:title'));
    assert.equal(metadata(html, 'name', 'twitter:description'), metadata(html, 'name', 'description'));
    assert.equal(metadata(html, 'name', 'twitter:card'), 'summary_large_image');
    assert.equal(metadata(html, 'property', 'og:image'), 'https://minesh.site/social-card.png');
    assert.equal(metadata(html, 'name', 'twitter:image'), metadata(html, 'property', 'og:image'));
    assert.equal(Number(metadata(html, 'property', 'og:image:width')), png.readUInt32BE(16));
    assert.equal(Number(metadata(html, 'property', 'og:image:height')), png.readUInt32BE(20));
    assert.ok(metadata(html, 'property', 'og:image:alt'));
    assert.equal(metadata(html, 'name', 'twitter:image:alt'), metadata(html, 'property', 'og:image:alt'));
  }
});

test('structured data represents the visible person, website, and actual photo collection', async () => {
  for (const html of [home, gallery]) {
    const data = schema(html);
    assert.equal(data['@context'], 'https://schema.org');
    const person = data['@graph'].find(item => item['@type'] === 'Person');
    assert.equal(person.name, 'Minesh Rajput');
    assert.equal(person.address.addressLocality, 'Kolhapur');
    assert.ok(person.sameAs.includes('https://github.com/mineshrajput22'));
    const website = data['@graph'].find(item => item['@type'] === 'WebSite');
    assert.equal(website.url, 'https://minesh.site/');
    assert.equal(website.publisher['@id'], person['@id']);
  }
  const homeData = schema(home)['@graph'];
  const profile = homeData.find(item => Array.isArray(item['@type']) && item['@type'].includes('ProfilePage'));
  assert.ok(profile['@type'].includes('WebPage'));
  assert.equal(profile.mainEntity['@id'], 'https://minesh.site/#person');
  const person = homeData.find(item => item['@type'] === 'Person');
  assert.equal(person.mainEntityOfPage['@id'], profile['@id']);
  assert.equal(person.alternateName, 'mineshrajput22');
  const graph = schema(gallery)['@graph'];
  const collection = graph.find(item => item['@type'] === 'CollectionPage');
  const count = [...gallery.matchAll(/data-photo-index="\d+"/g)].length;
  assert.equal(collection.mainEntity.numberOfItems, count);
  assert.equal(collection.mainEntity.itemListElement.length, count);
  for (const [index, entry] of collection.mainEntity.itemListElement.entries()) {
    assert.equal(entry.position, index + 1);
    const image = entry.item;
    assert.equal(image['@type'], 'ImageObject');
    assert.ok(image.name && image.width > 0 && image.height > 0);
    const url = new URL(image.contentUrl);
    assert.equal(url.origin, 'https://minesh.site');
    await access(path.join(root, url.pathname));
    assert.ok(gallery.includes(`src="${url.pathname}"`));
  }
  const breadcrumbs = graph.find(item => item['@type'] === 'BreadcrumbList').itemListElement;
  assert.deepEqual(breadcrumbs.map(item => item.item), ['https://minesh.site/', 'https://minesh.site/photography/']);
});

test('robots discovers a sitemap containing exactly the canonical HTML pages', async () => {
  const robots = await readFile(path.join(root, 'robots.txt'), 'utf8');
  const sitemap = await readFile(path.join(root, 'sitemap.xml'), 'utf8');
  assert.match(robots, /User-agent: \*\s+Allow: \/\s+Sitemap: https:\/\/minesh\.site\/sitemap\.xml/);
  const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, url]) => url);
  assert.deepEqual(locations.sort(), [canonical(home), canonical(gallery)].sort());
  assert.ok(!sitemap.includes('<lastmod>'), 'Do not fabricate update dates');
});
