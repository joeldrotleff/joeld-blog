---
title: "Using Local Images in Your Blog"
date: "2024-08-15"
readingTime: "2 min read"
tags: ["tutorial", "images", "local"]
description: "How to use images stored in your static folder"
---

# Using Local Images

This article demonstrates how to use images that are stored locally in your `/static/images/` folder rather than using external URLs.

## Local SVG Placeholder

Here's a sample placeholder image stored in our static folder:

![Sample placeholder image](/images/blog/sample-placeholder.svg)

*This is a locally stored SVG placeholder at `/static/images/blog/sample-placeholder.svg`*

## Flow Diagram Example

You can create and store diagrams as SVGs:

![Flow diagram showing input, process, and output](/images/blog/sample-diagram.svg)

*A simple flow diagram created as an SVG and stored locally*

## Advantages of Local Images

1. **Performance**: Images load from your own server, no external dependencies
2. **Reliability**: Images won't break if external services go down
3. **Privacy**: No third-party tracking from image hosts
4. **Control**: Full control over image optimization and formats

## How to Add Your Own Images

### Step 1: Add Images to Static Folder

Place your images in `/static/images/blog/` (or create subdirectories as needed):

```
/static/images/
├── blog/
│   ├── your-article/
│   │   ├── hero-image.jpg
│   │   ├── screenshot-1.png
│   │   └── diagram.svg
│   └── another-article/
│       └── photo.jpg
```

### Step 2: Reference in Markdown

Use the path starting from `/images/`:

```markdown
![Description](/images/blog/your-article/hero-image.jpg)
```

### Step 3: That's It!

The Fresh server automatically serves files from the `/static` folder at the root URL.

## Image Formats

You can use any web-compatible image format:

- **JPEG** (`.jpg`, `.jpeg`) - Best for photos
- **PNG** (`.png`) - Best for screenshots, images with transparency
- **WebP** (`.webp`) - Modern format with better compression
- **SVG** (`.svg`) - Best for diagrams, logos, icons
- **GIF** (`.gif`) - For animations

## Tips for Local Images

1. **Optimize before uploading**: Use tools like ImageOptim, TinyPNG, or Squoosh
2. **Use descriptive names**: `article-hero-sunset.jpg` instead of `IMG_1234.jpg`
3. **Organize by article**: Create folders for each article's images
4. **Consider dimensions**: 
   - Hero images: 1200-1600px wide
   - Content images: 800-1000px wide
   - Thumbnails: 400-600px wide

## Mixing Local and External Images

You can mix both approaches in the same article:

- Local image: `![Local](/images/blog/my-image.jpg)`
- External image: `![External](https://example.com/image.jpg)`

Choose based on your needs:
- **Local**: For important content, custom graphics, screenshots
- **External**: For stock photos, embedded content, temporary examples

---

Now you're ready to add your own images! Just drop them in `/static/images/blog/` and reference them in your markdown files.