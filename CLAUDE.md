# joeld-blog Project Instructions

## Deployment Process

### Article Changes
When you make changes to any article files (*.md files in the articles/ directory):
- Run `deno task articles:deploy` to deploy the articles to production
- The articles are stored in Deno KV and will be immediately available on the live site

### Code Changes
When you make changes to the application code (routes, components, islands, etc.):
- Commit your changes with conventional commit format
- Push to GitHub (`git push origin main`)
- GitHub Actions will automatically deploy the code changes to Deno Deploy

## Project Structure
- `/articles/` - Blog post markdown files with frontmatter
- `/routes/` - Fresh framework routes
- `/islands/` - Interactive components
- `/components/` - Static components
- `/scripts/` - Utility scripts including deployment tools