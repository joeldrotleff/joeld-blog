import { useSignal } from "@preact/signals";
import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import BlogLayout from "../islands/BlogLayout.tsx";
import { getAllArticles, Article } from "../utils/kv.ts";

interface HomeProps {
  articles: Article[];
}

export const handler: Handlers<HomeProps> = {
  async GET(req, ctx) {
    const articles = await getAllArticles();
    return ctx.render({ articles });
  },
};

export default function Home({ data }: PageProps<HomeProps>) {
  const { articles } = data;
  
  // Handle empty articles case
  if (!articles || articles.length === 0) {
    return (
      <>
        <Head>
          <title>Joel Drotleff - Blog</title>
        </Head>
        <div class="min-h-screen flex items-center justify-center bg-gray-900 text-white">
          <div class="text-center p-8">
            <h1 class="text-2xl mb-4">No articles found</h1>
            <p class="mb-4">Run the following commands to get started:</p>
            <pre class="bg-gray-800 p-4 rounded">
              <code>deno task articles:reload   # Load articles to Deno KV{"\n"}deno task articles:clear    # Clear all from Deno KV</code>
            </pre>
          </div>
        </div>
      </>
    );
  }
  
  const selectedPostId = useSignal(articles[0].id);

  const selectedPost = articles.find(p => p.id === selectedPostId.value) || articles[0];

  return (
    <>
      <Head>
        <title>Joel Drotleff - Blog</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet" />
      </Head>
      <BlogLayout
        posts={articles}
        selectedPost={selectedPost}
        selectedPostId={selectedPostId}
      />
    </>
  );
}