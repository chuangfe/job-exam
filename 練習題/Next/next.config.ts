import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // cacheComponents/partialPrefetching（新版 Cache Components 模型）跟這個練習題集要示範的
  // 經典 Route Segment Config（export const dynamic/revalidate）互斥，且屬於實驗性功能，
  // 依本專案「只用穩定版 API」的原則關閉，維持舊版 fetch 快取 + revalidate 模型可用。
  // repo root 的 package-lock.json 讓 Next 誤判 workspace root，明確指定避免警告。
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
