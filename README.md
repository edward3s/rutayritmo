# Ruta y Ritmo

Un blog de running: rutas, entrenamiento, material, nutrición, salud y carreras.

Está construido con Astro 7 como sitio estático. No tiene backend ni base de datos: solo páginas HTML, CSS y JavaScript mínimo.

## Arrancar

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # genera dist/
npm run preview  # sirve dist/
```

## Contenido

- Artículos: `src/content/articulos/*.md`.
- Rutas: `src/content/rutas/*.md`.
- Categorías: `src/data/categorias.ts`.
- Datos del sitio: `src/data/site.ts`.
- Autor: `src/data/autor.ts`.
- Portadas de artículo: `public/images/articles/*.svg`.
- Imágenes Open Graph: `public/images/og/*.png`.

Para añadir un artículo, crea un `.md` en `src/content/articulos/` con el frontmatter que valida `src/content.config.ts`:

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

El slug es el nombre del archivo. Los enlaces internos deben terminar en `/`, por ejemplo `/diario/zona-2-correr-despacio/`.

## Imágenes

```bash
npm run covers   # regenera las portadas SVG de los artículos
npm run og       # genera las imágenes Open Graph PNG a partir de las portadas
```

Las imágenes sociales de cada artículo se guardan en `public/images/og/<slug>.png`.

## SEO

- Sitemap: `/sitemap-index.xml`.
- RSS: `/rss.xml`.
- `robots.txt` generado desde `src/pages/robots.txt.ts`.
- Canonical, Open Graph y JSON-LD en `src/layouts/BaseLayout.astro` y `src/layouts/ArticleLayout.astro`.
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
├── content/      Artículos y rutas en Markdown
├── data/         Datos del sitio, categorías y autor
├── layouts/      Layouts base, de página y de artículo
├── lib/          Utilidades
├── pages/        Rutas de Astro
└── styles/       CSS global
```
