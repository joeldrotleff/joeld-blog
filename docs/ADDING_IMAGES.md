# 📸 Adding Your Own Images to Blog Posts

## Quick Start

1. **Drop your images** into `/static/images/blog/`
2. **Reference them** in your markdown: `![Description](/images/blog/your-image.jpg)`
3. **That's it!** Fresh automatically serves them

## Folder Structure

```
/static/images/
├── blog/                    # Your blog images go here
│   ├── sample-placeholder.svg
│   ├── sample-diagram.svg
│   └── (your images here)
└── README.md               # More detailed guide
```

## Examples

### Basic Image
```markdown
![My vacation photo](/images/blog/vacation.jpg)
```

### Image with Caption
```markdown
![Sunset at the beach](/images/blog/sunset.jpg)
*Taken in Santa Monica, California*
```

### Multiple Images
```markdown
![Before](/images/blog/before.jpg) ![After](/images/blog/after.jpg)
```

## Supported Formats

- ✅ **JPEG/JPG** - Photos
- ✅ **PNG** - Screenshots, graphics
- ✅ **GIF** - Animations
- ✅ **SVG** - Diagrams, logos
- ✅ **WebP** - Modern optimized format

## Pro Tips

### Image Optimization
Before adding images, optimize them:
- **Online**: [TinyPNG](https://tinypng.com/), [Squoosh](https://squoosh.app/)
- **Mac**: ImageOptim app
- **Command line**: `deno task optimize-images` (if you add the script)

### Recommended Sizes
- **Hero/Banner**: 1200-1600px wide
- **Content**: 800-1000px wide  
- **Inline/Small**: 400-600px wide

### Organization
Create subfolders for better organization:
```
/static/images/blog/
├── 2024-08-travel/
│   ├── hero.jpg
│   ├── photo-1.jpg
│   └── photo-2.jpg
└── 2024-09-project/
    ├── screenshot.png
    └── diagram.svg
```

Then reference: `![Travel hero](/images/blog/2024-08-travel/hero.jpg)`

## Test Your Images

1. Add an image to `/static/images/blog/`
2. Run `deno task articles:reload`
3. Create a test article:

```markdown
---
title: "Image Test"
date: "2024-08-15"
---

Testing my image:

![Test image](/images/blog/my-test-image.jpg)
```

4. View in browser at `http://localhost:8000`

## Troubleshooting

**Image not showing?**
- Check the path starts with `/images/` (not `/static/images/`)
- Verify the file exists in `/static/images/blog/`
- Check filename case (it's case-sensitive)
- Make sure the server is running

**Image too large?**
- Images auto-scale to fit content width
- For smaller images, add to alt text: `![Small icon logo](/images/logo.png)`

## Sample Articles

Check these articles for examples:
- `using-local-images.md` - Local image examples
- `media-showcase.md` - Various media types

Happy blogging! 🎉