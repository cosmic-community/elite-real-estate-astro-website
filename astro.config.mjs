import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import node from '@astrojs/node';

export default defineConfig({
  integrations: [tailwind()],
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),
  server: {
    port: 3000,
    host: true
  },
  trailingSlash: 'ignore',
  build: {
    format: 'directory'
  },
  vite: {
    define: {
      'process.env.COSMIC_BUCKET_SLUG': JSON.stringify(process.env.COSMIC_BUCKET_SLUG),
      'process.env.COSMIC_READ_KEY': JSON.stringify(process.env.COSMIC_READ_KEY),
      'process.env.COSMIC_WRITE_KEY': JSON.stringify(process.env.COSMIC_WRITE_KEY),
    }
  }
});