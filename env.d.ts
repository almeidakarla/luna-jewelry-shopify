/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly PUBLIC_STORE_DOMAIN: string;
  readonly PUBLIC_STOREFRONT_API_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
