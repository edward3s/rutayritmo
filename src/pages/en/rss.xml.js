import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '../../data/site';
import { t } from '../../i18n/ui';

export async function GET(context) {
  const articulos = await getCollection('articulosEn');
  const rutas = await getCollection('rutasEn');

  const items = [
    ...articulos.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      pubDate: entry.data.publishedAt,
      link: `/en/diario/${entry.id}/`,
      categories: [entry.data.category],
    })),
    ...rutas.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      pubDate: entry.data.publishedAt,
      link: `/en/rutas/${entry.id}/`,
      categories: ['rutas'],
    })),
  ].sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  return rss({
    title: 'Ruta y Ritmo — Running journal',
    description: t('en', 'homeLede'),
    site: context.site ?? SITE.url,
    items,
    customData: '<language>en-us</language>',
  });
}
