import { profiles } from '../data/portfolio';
import { notebookPhotos } from '../data/notebook';

export const pageMetadata = {
  home: {
    path: '/',
    title: 'Minesh Rajput | Full-stack Developer in Kolhapur, India',
    description: 'Minesh Rajput is a full-stack developer in Kolhapur, India. Explore React and TypeScript projects, production experience, and photography.',
  },
  photography: {
    path: '/photography/',
    title: 'Photography by Minesh Rajput | Visual Notebook',
    description: 'Explore photography by Minesh Rajput: portraits, street scenes, festivals, and landscapes collected in his visual notebook.',
  },
} as const;

export type PageKind = keyof typeof pageMetadata;

export function canonicalUrl(site: URL | undefined, pathname: string) {
  if (!site) throw new Error('Set the production site URL in astro.config.mjs before building.');
  return new URL(`${pathname.replace(/\/+$/, '')}/`, site);
}

export function pageStructuredData(site: URL, canonical: URL, page: PageKind, title: string, description: string) {
  const personId = new URL('#person', site).href;
  const websiteId = new URL('#website', site).href;
  const person = {
    '@type': 'Person', '@id': personId,
    name: 'Minesh Rajput', alternateName: 'mineshrajput22',
    url: site.href, jobTitle: 'Full-stack Developer',
    description: pageMetadata.home.description,
    mainEntityOfPage: { '@id': `${new URL('/', site).href}#webpage` },
    address: { '@type': 'PostalAddress', addressLocality: 'Kolhapur', addressCountry: 'IN' },
    sameAs: [...profiles.filter(profile => profile.href.startsWith('https://')).map(profile => profile.href), 'https://www.instagram.com/kon.hu.main_09/'],
  };
  const webpage = {
    '@type': page === 'photography' ? 'CollectionPage' : ['WebPage', 'ProfilePage'],
    '@id': `${canonical.href}#webpage`, url: canonical.href, name: title, description,
    inLanguage: 'en-IN', isPartOf: { '@id': websiteId }, author: { '@id': personId },
    about: { '@id': personId },
    mainEntity: page === 'photography' ? {
      '@type': 'ItemList', numberOfItems: notebookPhotos.length,
      itemListElement: notebookPhotos.map((photo, index) => ({
        '@type': 'ListItem', position: index + 1,
        item: {
          '@type': 'ImageObject', name: photo.alt, caption: photo.alt,
          contentUrl: new URL(`/images/notebook/${photo.file}.webp`, site).href,
          width: photo.width, height: photo.height, creator: { '@id': personId },
        },
      })),
    } : { '@id': personId },
  };
  const graph: Record<string, unknown>[] = [
    person,
    { '@type': 'WebSite', '@id': websiteId, url: site.href, name: 'Minesh Rajput', inLanguage: 'en-IN', publisher: { '@id': personId } },
    webpage,
  ];
  if (page === 'photography') graph.push({
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: site.href },
      { '@type': 'ListItem', position: 2, name: 'Photography', item: canonical.href },
    ],
  });
  return { '@context': 'https://schema.org', '@graph': graph };
}
