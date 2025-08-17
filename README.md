# Joel's Blog

A personal blog built with Deno Fresh, featuring markdown articles with dark/light mode support.

## Quick Start

Make sure to install Deno: https://deno.land/manual/getting_started/installation

```bash
# Start development server
deno task start

# Load articles into local KV
deno task articles:reload

# Deploy articles to production
deno task articles:deploy
```

## Documentation

For detailed guides on specific features, check the `/docs` folder:

- **[Adding Images Guide](docs/ADDING_IMAGES.md)** - How to add and use images in your blog posts
- **[Image Guide](docs/IMAGE_GUIDE.md)** - Comprehensive guide for all image and media features

## Available Commands

- `deno task start` - Start development server with hot reload
- `deno task build` - Build for production
- `deno task articles:reload` - Load articles from markdown into local KV
- `deno task articles:deploy` - Deploy articles to production KV
- `deno task articles:clear` - Clear all articles from local KV
- `deno task check` - Run format, lint, and type checks

## Deployment

The blog automatically deploys to Deno Deploy when you push to the main branch via GitHub Actions.
