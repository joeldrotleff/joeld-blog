# Adding Images to Your Blog Posts

Your blog now fully supports images and GIFs! Here's how to use them:

## Quick Reference

### Basic Image
```markdown
![Alt text describing the image](https://example.com/image.jpg)
```

### Image with Caption
```markdown
![Beautiful sunset](https://example.com/sunset.jpg)
*Photo taken at Golden Gate Bridge*
```

### Animated GIF
```markdown
![Loading animation](https://example.com/animation.gif)
```

### Clickable Image
```markdown
[![Click to enlarge](https://example.com/thumbnail.jpg)](https://example.com/full-size.jpg)
```

### Inline Small Image
Add "icon", "logo", or "inline" to the alt text to make it small:
```markdown
Here's a GitHub ![GitHub icon](https://github.com/favicon.ico) icon inline with text.
```

## Image Sources

### Option 1: External URLs
Use any publicly accessible image URL:
- Unsplash: `https://images.unsplash.com/...`
- Pexels: `https://images.pexels.com/...`
- Your CDN: `https://cdn.yourdomain.com/...`

### Option 2: Static Folder (Recommended for Production)
1. Add images to `/static/images/` folder
2. Reference them with: `![Alt text](/images/your-image.jpg)`

### Option 3: GitHub Repository
If your repo is public, you can use GitHub's raw URLs:
```markdown
![Image](https://raw.githubusercontent.com/username/repo/main/images/photo.jpg)
```

## Features

✅ **Automatic Styling**: Images get rounded corners and shadows
✅ **Responsive**: Images automatically scale to fit the content width
✅ **Dark Mode Support**: Shadows adjust for dark/light themes
✅ **GIF Support**: Animated GIFs work automatically
✅ **Performance**: Images load with browser's native lazy loading

## Tips

1. **Alt Text**: Always include descriptive alt text for accessibility
2. **File Size**: Optimize images before uploading (use tools like TinyPNG)
3. **Formats**: Use JPEG for photos, PNG for graphics with transparency, GIF for animations
4. **Dimensions**: Images wider than 800px will be automatically scaled down

## Example Article

Check out `articles/media-showcase.md` for a complete example with various image types and layouts.

## Need HTML Control?

You can use HTML directly in markdown for more control:

```markdown
<figure>
  <img src="image.jpg" alt="Description" style="width: 50%;">
  <figcaption>Custom styled image at 50% width</figcaption>
</figure>
```

That's it! Your images will look great in both dark and light modes with automatic responsive sizing.