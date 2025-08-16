---
title: "Working with Images and Media in Markdown"
date: "2024-08-15"
readingTime: "3 min read"
tags: ["tutorial", "markdown", "media"]
description: "A guide to embedding images, GIFs, and other media in your blog posts"
---

# Images and Media in Your Blog

This post demonstrates how to work with various types of media in your markdown blog posts. The `marked` library we use supports standard markdown image syntax, making it easy to add visual content.

## Basic Image Embedding

You can embed images using the standard markdown syntax:

![A beautiful landscape](https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80)

*Caption: Mountain landscape from Unsplash*

## Inline Images

Sometimes you want smaller images inline with text. Here's a small icon ![GitHub Logo](https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png) that appears inline with the text.

## GIF Support

Animated GIFs work just like regular images:

![Loading animation](https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif)

## Multiple Images in a Row

You can place multiple images side by side by putting them on the same line:

![First](https://via.placeholder.com/200x150/FF6B6B/FFFFFF?text=First) ![Second](https://via.placeholder.com/200x150/4ECDC4/FFFFFF?text=Second) ![Third](https://via.placeholder.com/200x150/45B7D1/FFFFFF?text=Third)

## Using Different Image Sources

### External URLs
You can use any publicly accessible image URL:

![Photo from Pexels](https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?w=600)

### Placeholder Images
Great for prototyping:

![Placeholder](https://via.placeholder.com/600x400/7F8C8D/FFFFFF?text=Your+Image+Here)

## Best Practices

1. **Alt Text**: Always include descriptive alt text for accessibility
2. **Image Size**: Consider using width parameters in URLs when available
3. **Performance**: Use optimized images and consider lazy loading for heavy pages
4. **Hosting**: For production, consider using a CDN or storing images in your static folder

## Local Images (Static Folder)

For production blogs, you can store images in the `/static` folder and reference them like this:

```markdown
![Local Image](/images/my-image.jpg)
```

## Image with Link

You can make images clickable by wrapping them in links:

[![Click me to go to GitHub](https://github.githubassets.com/images/modules/logos_page/GitHub-Logo.png)](https://github.com)

## Code Examples

Here's how to add images in your markdown:

```markdown
# Basic image
![Alt text](image-url)

# Image with title (shows on hover)
![Alt text](image-url "Image title")

# Clickable image
[![Alt text](image-url)](link-url)
```

## Responsive Considerations

The blog's CSS using Tailwind's prose classes automatically makes images responsive. They'll scale appropriately on different screen sizes.

## Advanced: HTML in Markdown

If you need more control, you can use HTML directly in markdown:

<div align="center">
  <img src="https://via.placeholder.com/400x300/9B59B6/FFFFFF?text=Centered+Image" alt="Centered image" style="border-radius: 10px;">
</div>

<br>

<figure>
  <img src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=80" alt="A cute dog">
  <figcaption style="text-align: center; font-style: italic;">Figure 1: Using HTML figure element for better semantic markup</figcaption>
</figure>

---

That's it! Your markdown blog now fully supports images, GIFs, and other media. The Tailwind prose classes ensure everything looks good by default.