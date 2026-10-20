import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { getCategoria } from '../../data/categorias';
import { t } from '../../i18n/ui';

export const GET: APIRoute = async () => {
  const articulos = await getCollection('articulosEn');
  const rutas = await getCollection('rutasEn');

  const index = [
    ...articulos.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      category: getCategoria(entry.data.category, 'en').name,
      type: t('en', 'articleType'),
      url: `/en/diario/${entry.id}/`,
      date: entry.data.publishedAt.toISOString(),
    })),
    ...rutas.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      category: t('en', 'routeSection'),
      type: t('en', 'routeType'),
      url: `/en/rutas/${entry.id}/`,
      date: entry.data.publishedAt.toISOString(),
    })),
  ];

  return new Response(JSON.stringify(index), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
};
