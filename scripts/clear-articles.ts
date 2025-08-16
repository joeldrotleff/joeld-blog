#!/usr/bin/env -S deno run --allow-env --unstable-kv

const kv = await Deno.openKv();

console.log("🗑️  Clearing all articles from Deno KV...");

const entries = kv.list({ prefix: ["articles"] });
let count = 0;

for await (const entry of entries) {
  await kv.delete(entry.key);
  count++;
}

console.log(`✅ Cleared ${count} article(s) from database`);

kv.close();