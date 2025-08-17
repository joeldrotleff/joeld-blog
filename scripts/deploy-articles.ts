#!/usr/bin/env -S deno run --allow-read --allow-env --allow-net --allow-run --unstable-kv --env-file=.env.prod

async function deployArticles() {
  // Get KV URL from environment (loaded from .env.prod via --env-file flag)
  const kvUrl = Deno.env.get("DENO_KV_URL");
  if (!kvUrl) {
    console.error("❌ DENO_KV_URL not found in environment variables");
    console.log("\nPlease ensure .env.prod contains:");
    console.log("DENO_KV_URL=your-database-url");
    console.log("\nOr run with: deno task articles:deploy");
    Deno.exit(1);
  }
  
  // Check for access token (from environment only for security)
  const accessToken = Deno.env.get("DENO_KV_ACCESS_TOKEN");
  if (!accessToken) {
    console.error("❌ DENO_KV_ACCESS_TOKEN environment variable not set");
    console.log("\nTo get your access token:");
    console.log("1. Go to https://dash.deno.com/account");
    console.log("2. Click 'New Access Token'");
    console.log("3. Give it a name like 'blog-articles'");
    console.log("4. Copy the token");
    console.log("5. Run: DENO_KV_ACCESS_TOKEN='your-token' deno task articles:deploy");
    console.log("\nOr save it permanently:");
    console.log("echo 'export DENO_KV_ACCESS_TOKEN=\"your-token\"' >> ~/.zshrc");
    Deno.exit(1);
  }

  // First, compile articles to local KV
  console.log("📦 Step 1: Compiling articles locally...");
  const compileCommand = new Deno.Command("deno", {
    args: ["run", "--allow-read", "--allow-write", "--allow-env", "--unstable-kv", "scripts/compile-articles.ts"],
  });
  
  const compileResult = await compileCommand.output();
  if (!compileResult.success) {
    console.error("❌ Failed to compile articles locally");
    console.error(new TextDecoder().decode(compileResult.stderr));
    Deno.exit(1);
  }
  
  console.log("✅ Articles compiled locally");
  
  // Now copy from local KV to production KV
  console.log("\n🚀 Step 2: Deploying to production...");
  console.log("📤 Copying articles from local KV to production KV...");
  
  // Open both local and production KV
  const localKv = await Deno.openKv();
  const prodKv = await Deno.openKv(kvUrl);
  
  // Clear existing articles in production
  const prodEntries = prodKv.list({ prefix: ["articles"] });
  for await (const entry of prodEntries) {
    await prodKv.delete(entry.key);
  }
  
  // Copy all articles from local to production
  let articleCount = 0;
  const localArticles = localKv.list({ prefix: ["articles"] });
  for await (const entry of localArticles) {
    await prodKv.set(entry.key, entry.value);
    articleCount++;
    console.log(`  ↗️  Deployed: ${entry.key[1]}`);
  }
  
  // Copy the article list
  const articleList = await localKv.get(["article_list"]);
  if (articleList.value) {
    await prodKv.set(["article_list"], articleList.value);
  }
  
  console.log(`\n✅ Successfully deployed ${articleCount} articles to production!`);
  console.log(`🌐 View your blog at: https://joeld-blog.deno.dev`);
  
  // Close KV connections
  localKv.close();
  prodKv.close();
}

if (import.meta.main) {
  await deployArticles();
}