import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/shifucun-portfolio/',
  plugins: [react()],
  assetsInclude: ['**/*.glb']
});
