# Blog Images Directory

This directory is for storing images used in your blog posts.

## Directory Structure

```
/static/images/
├── README.md (this file)
├── blog/         # Blog post images
│   └── (your article images go here)
└── (any other image categories)
```

## How to Add Images

1. **Add your image files here**: Drop your images into `/static/images/blog/` or create subdirectories as needed
2. **Supported formats**: .jpg, .jpeg, .png, .gif, .webp, .svg
3. **Naming convention**: Use descriptive names like `article-name-description.jpg`

## Using Images in Articles

Once you've added an image to this directory, reference it in your markdown like this:

```markdown
![Alt text](/images/blog/your-image.jpg)
```

## Example

If you add an image called `sunset-beach.jpg` to `/static/images/blog/`, use it in your markdown:

```markdown
![Beautiful sunset at the beach](/images/blog/sunset-beach.jpg)
```

## Tips

- **Optimize images**: Use tools like [TinyPNG](https://tinypng.com/) or [Squoosh](https://squoosh.app/) before adding
- **Recommended max width**: 1600px for hero images, 800px for content images
- **File size**: Try to keep images under 500KB for better performance
- **Use WebP**: Consider converting to WebP format for better compression

## Organization Ideas

You might want to organize images by:
- Date: `/images/2024/08/image.jpg`
- Article: `/images/blog/my-first-post/image.jpg`
- Type: `/images/screenshots/`, `/images/diagrams/`, `/images/photos/`