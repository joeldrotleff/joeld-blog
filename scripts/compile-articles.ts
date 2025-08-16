#!/usr/bin/env -S deno run --allow-read --allow-write --allow-env --unstable-kv

import { parse } from "https://deno.land/std@0.224.0/yaml/mod.ts";
import { marked } from "https://esm.sh/marked@12.0.0";
import { walk } from "https://deno.land/std@0.224.0/fs/walk.ts";
import { extname, basename } from "https://deno.land/std@0.224.0/path/mod.ts";

interface ArticleFrontmatter {
  title: string;
  date: string;
  readingTime?: string;
  slug?: string;
  tags?: string[];
  description?: string;
}

interface Article {
  id: string;
  slug: string;
  title: string;
  date: string;
  readingTime: string;
  content: string;
  tags?: string[];
  description?: string;
}

function extractFrontmatter(content: string): { frontmatter: ArticleFrontmatter; body: string } {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    throw new Error("No frontmatter found in markdown file");
  }
  
  const [, frontmatterYaml, body] = match;
  const frontmatter = parse(frontmatterYaml) as ArticleFrontmatter;
  
  return { frontmatter, body };
}

function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
}

async function compileArticles() {
  const kv = await Deno.openKv();
  const articles: Article[] = [];
  
  console.log("🔄 Compiling articles from markdown files...");
  
  // Clear existing articles
  const entries = kv.list({ prefix: ["articles"] });
  for await (const entry of entries) {
    await kv.delete(entry.key);
  }
  
  // Walk through articles directory
  for await (const entry of walk("articles", { exts: [".md", ".markdown"] })) {
    if (entry.isFile) {
      console.log(`📝 Processing: ${entry.path}`);
      
      const content = await Deno.readTextFile(entry.path);
      const { frontmatter, body } = extractFrontmatter(content);
      
      // Generate slug from filename or frontmatter
      const filename = basename(entry.path, extname(entry.path));
      const slug = frontmatter.slug || filename.toLowerCase().replace(/\s+/g, "-");
      
      // Convert markdown to HTML
      const htmlContent = await marked(body);
      
      // Calculate reading time if not provided
      const readingTime = frontmatter.readingTime || calculateReadingTime(body);
      
      const article: Article = {
        id: slug,
        slug,
        title: frontmatter.title,
        date: frontmatter.date,
        readingTime,
        content: htmlContent,
        tags: frontmatter.tags,
        description: frontmatter.description,
      };
      
      articles.push(article);
      
      // Store in KV
      await kv.set(["articles", slug], article);
    }
  }
  
  // Store article list for quick access
  await kv.set(["article_list"], articles.map(a => ({
    id: a.id,
    slug: a.slug,
    title: a.title,
    date: a.date,
    readingTime: a.readingTime,
    description: a.description,
    tags: a.tags,
  })));
  
  console.log(`✅ Compiled ${articles.length} articles to Deno KV`);
  
  // Close KV
  kv.close();
}

if (import.meta.main) {
  await compileArticles();
}