# Ruta y Ritmo

Un blog de running bilingüe: rutas, entrenamiento, material, nutrición, salud y carreras, en español e inglés.

Está construido con Astro 7 como sitio estático. No tiene backend ni base de datos: solo páginas HTML, CSS y JavaScript mínimo.

## Arrancar

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # genera dist/
npm run preview  # sirve dist/
```

## Contenido

- Artículos en español: `src/content/articulos/*.md`.
- Artículos en inglés: `src/content/articulos-en/*.md`.
- Rutas en español: `src/content/rutas/*.md`.
- Rutas en inglés: `src/content/rutas-en/*.md`.
- Categorías y sus traducciones: `src/data/categorias.ts`.
- Datos del sitio: `src/data/site.ts`.
- Autor: `src/data/autor.ts`.
- Textos de interfaz: `src/i18n/ui.ts`.
- Portadas de artículo: `public/images/articles/*.svg`.
- Portadas en inglés: `public/images/articles/en/*.svg`.
- Imágenes Open Graph: `public/images/og/*.png`.
- Imágenes Open Graph en inglés: `public/images/og/en/*.png`.
- Tarjetas sociales generales: `public/og-default.png` y `public/og-default-en.png`.

Para añadir un artículo, crea un `.md` en `src/content/articulos/` y su versión inglesa en `src/content/articulos-en/` con el mismo nombre de archivo. El frontmatter que valida `src/content.config.ts` es:

```yaml
---
title: "Título"
description: "Resumen de 140-160 caracteres."
category: "entrenamiento" # entrenamiento | material | nutricion | salud | carreras
publishedAt: 2026-10-20
updatedAt: 2026-10-20
featured: false
sources:
  - title: "Fuente"
    url: "https://..."
---
```

El slug es el nombre del archivo. Los enlaces internos en español deben terminar en `/`, por ejemplo `/diario/zona-2-correr-despacio/`. En los archivos ingleses, los enlaces internos llevan el prefijo `/en/`, por ejemplo `/en/diario/zona-2-correr-despacio/`.

## Idiomas

- Español: `/`, `/diario/`, `/rutas/`, etc.
- Inglés: `/en/`, `/en/diario/`, `/en/rutas/`, etc.
- El selector `EN` / `ES` del encabezado cambia de idioma conservando la página.
- Cada página declara `hreflang="es"`, `hreflang="en"` y `x-default`.
- El buscador inglés usa `/en/buscar.json` y el RSS inglés está en `/en/rss.xml`.

## Imágenes

```bash
npm run covers      # regenera las portadas SVG en español e inglés
npm run og          # genera las imágenes Open Graph en español e inglés
npm run og-default  # regenera las tarjetas sociales generales
npm run en-assets   # regenera solo portadas y OG inglesas
```

Las imágenes sociales de cada artículo se guardan en `public/images/og/<slug>.png` y `public/images/og/en/<slug>.png`.

## SEO

- Sitemap: `/sitemap-index.xml`.
- RSS: `/rss.xml` y `/en/rss.xml`.
- `robots.txt` generado desde `src/pages/robots.txt.ts`.
- Canonical, `hreflang`, Open Graph y JSON-LD en `src/layouts/BaseLayout.astro` y `src/layouts/ArticleLayout.astro`.
- Redirecciones de Vercel en `vercel.json`.

## Despliegue

El proyecto se despliega en Vercel desde `edward3s/rutayritmo`.

- Dominio: `https://www.rutayritmo.site`.
- `rutayritmo.site` redirige a `www`.
- Build: `npm run build`.
- Salida: `dist/`.

No hay formularios de contacto ni newsletter. El sitio no recoge datos mediante formularios.

## Estructura

```text
src/
├── components/   Componentes de interfaz
├── content/      Artículos y rutas en Markdown (es/en)
├── data/         Datos del sitio, categorías y autor
├── i18n/         Textos de interfaz y utilidades de idioma
├── layouts/      Layouts base, de página y de artículo
├── lib/          Utilidades
├── pages/        Rutas de Astro (español e inglés)
└── styles/       CSS global
```
