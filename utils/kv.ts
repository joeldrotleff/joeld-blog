export interface Article {
  id: string;
  slug: string;
  title: string;
  date: string;
  readingTime: string;
  content: string;
  tags?: string[];
  description?: string;
}

export interface ArticleMetadata {
  id: string;
  slug: string;
  title: string;
  date: string;
  readingTime: string;
  description?: string;
  tags?: string[];
}

let kvInstance: Deno.Kv | null = null;

async function getKv(): Promise<Deno.Kv | null> {
  if (!kvInstance) {
    try {
      kvInstance = await Deno.openKv();
    } catch (error) {
      console.warn("Deno KV not available. Run with --unstable-kv flag or compile articles first.");
      return null;
    }
  }
  return kvInstance;
}

export async function getArticleList(): Promise<ArticleMetadata[]> {
  const kv = await getKv();
  if (!kv) return [];
  const result = await kv.get<ArticleMetadata[]>(["article_list"]);
  return result.value || [];
}

export async function getArticle(slug: string): Promise<Article | null> {
  const kv = await getKv();
  if (!kv) return null;
  const result = await kv.get<Article>(["articles", slug]);
  return result.value;
}

export async function getAllArticles(): Promise<Article[]> {
  const kv = await getKv();
  if (!kv) return [];
  const articles: Article[] = [];
  
  const entries = kv.list<Article>({ prefix: ["articles"] });
  for await (const entry of entries) {
    if (entry.value) {
      articles.push(entry.value);
    }
  }
  
  // Sort by date (newest first)
  articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  return articles;
}

export async function searchArticles(query: string): Promise<ArticleMetadata[]> {
  const articles = await getArticleList();
  const lowerQuery = query.toLowerCase();
  
  return articles.filter(article => 
    article.title.toLowerCase().includes(lowerQuery) ||
    article.description?.toLowerCase().includes(lowerQuery) ||
    article.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
}

export async function getArticlesByTag(tag: string): Promise<ArticleMetadata[]> {
  const articles = await getArticleList();
  return articles.filter(article => 
    article.tags?.includes(tag)
  );
}

// Close KV connection when needed
export function closeKv() {
  if (kvInstance) {
    kvInstance.close();
    kvInstance = null;
  }
}