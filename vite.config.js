import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
  base: process.env.GITHUB_PAGES === 'true' ? '/shifucun-portfolio/' : '/',
  plugins: [react(), cloudflare()],
  assetsInclude: ['**/*.glb']
});