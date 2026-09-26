/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Strapi base URL that receives form leads (POST /api/leads/submit). */
  readonly VITE_LEADS_API_URL?: string;
}

declare module "*.md?raw" {
  const src: string;
  export default src;
}
