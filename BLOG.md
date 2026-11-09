# Blog

El blog usa **Astro Content Collections** con la API moderna de Astro 6 (`glob` loader). Cada artículo es un archivo Markdown dentro de `src/content/blog/`.

## Estructura

```
src/content/blog/
├── en/<slug>.md
├── es/<slug>.md
└── pt/<slug>.md
```

- El nombre del archivo es el slug de la URL: `mi-articulo.md` → `/blog/mi-articulo/` (o `/es/blog/mi-articulo/`, `/pt/blog/mi-articulo/`).
- Un artículo puede existir en **uno o varios idiomas**. No es obligatorio traducirlo a los tres.
- Para que el selector de idioma enlace las traducciones, usa el **mismo nombre de archivo** en los idiomas que existan.

## Frontmatter

```yaml
---
title: "Título del artículo"
description: "Resumen breve para la lista del blog y las meta etiquetas."
pubDate: 2026-11-09
lang: es
author: "Carlos Gabriel Sánchez Jiménez" # opcional
tags: ["linux", "desarrollo web"]        # opcional
cover: "/blog/mi-articulo/portada.webp"  # opcional
coverAlt: "Descripción de la portada"    # opcional
updatedDate: 2026-11-15                  # opcional
draft: false                             # opcional
legacyUrl: "https://blog-anterior.com/mi-articulo/" # opcional
---
```

| Campo | Obligatorio | Descripción |
|---|---|---|
| `title` | Sí | Título del artículo. |
| `description` | Sí | Resumen corto para SEO y listados. |
| `pubDate` | Sí | Fecha de publicación (`YYYY-MM-DD`). |
| `lang` | Sí | `en`, `es` o `pt`. Debe coincidir con la carpeta. |
| `author` | No | Por defecto, Carlos Gabriel Sánchez Jiménez. |
| `tags` | No | Etiquetas para el buscador y los filtros. |
| `cover` | No | Imagen destacada. Ruta en `public/` o URL absoluta. |
| `coverAlt` | No | Texto alternativo de la portada. |
| `updatedDate` | No | Fecha de última actualización. |
| `draft` | No | Si es `true`, no se publica en producción. |
| `legacyUrl` | No | URL original (útil para futuras redirecciones desde WordPress). |

## Crear un artículo

1. Crea el archivo en la carpeta del idioma:

   ```bash
   touch src/content/blog/es/mi-articulo.md
   ```

2. Añade el frontmatter y el contenido.
3. Ejecuta `npm run dev` y abre `http://localhost:4321/es/blog/mi-articulo/`.
4. Comprueba que aparece en `/es/blog/`.

## Markdown

Astro incluye GitHub Flavored Markdown: tablas, task lists, footnotes, enlaces automáticos y resaltado de código con Shiki.

````md
## Título de sección

**Negrita**, _cursiva_, `código inline`.

- Elemento de lista
- Otro elemento

1. Primero
2. Segundo

> Cita

| Columna A | Columna B |
|-----------|-----------|
| Dato 1    | Dato 2    |

- [x] Tarea completada
- [ ] Tarea pendiente

```bash
echo "Hola"
```
````

### Imágenes

Guarda las imágenes en `public/blog/<slug>/` y referéncialas con una ruta absoluta:

```md
![Descripción](/blog/mi-articulo/imagen.webp)
```

También puedes usar una URL externa. Para ampliar una imagen:

```html
<a href="/blog/mi-articulo/imagen-grande.webp" target="_blank">
  <img src="/blog/mi-articulo/imagen.webp" alt="Descripción" />
</a>
```

### Videos

```html
<iframe
  width="560"
  height="315"
  src="https://www.youtube.com/embed/VIDEO_ID"
  title="Título del video"
  frameborder="0"
  allowfullscreen
></iframe>
```

### HTML

Puedes mezclar HTML con Markdown. Útil para detalles colapsables:

```html
<details>
  <summary>Ver más</summary>
  Contenido oculto.
</details>
```

## Buscador y etiquetas

- El índice de cada idioma incluye un buscador en el cliente que filtra por título, descripción y etiquetas.
- Las etiquetas enlazan a `?tag=nombre`, que activa el filtro automáticamente.
- No requiere servicios externos ni dependencias de JavaScript.

## RSS y sitemap

- RSS: `/blog/rss.xml`, `/es/blog/rss.xml`, `/pt/blog/rss.xml`.
- Sitemap: `/sitemap-index.xml` (generado por `@astrojs/sitemap`).
- `robots.txt` apunta al sitemap.

## Importar desde WordPress

Cuando se defina la URL del blog anterior:

1. Exportar las entradas (REST API o XML).
2. Convertir cada entrada a Markdown con el frontmatter de arriba.
3. Descargar las imágenes a `public/blog/<slug>/`.
4. Guardar la URL original en `legacyUrl`.
5. Revisar enlaces internos, imágenes y videos incrustados.
6. Ejecutar `npm run build` y comprobar las rutas.

## Comandos

```bash
npm run dev       # Desarrollo en localhost:4321
npm run build     # Genera dist/
npm run preview   # Previsualiza la build
```
