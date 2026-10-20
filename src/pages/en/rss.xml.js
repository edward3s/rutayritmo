import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { getCategoria } from '../../data/categorias';
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
      categories: [getCategoria(entry.data.category, 'en').name],
    })),
    ...rutas.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      pubDate: entry.data.publishedAt,
      link: `/en/rutas/${entry.id}/`,
      categories: ['Routes'],
    })),
  ].sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  return rss({
    title: 'Ruta y Ritmo — Running journal',
    description: t('en', 'homeLede'),
    site: new URL('/en/', context.site ?? SITE.url).toString(),
    items,
    customData: '<language>en-us</language>',
  });
}
