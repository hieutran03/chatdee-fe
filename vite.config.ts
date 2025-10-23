/* global __dirname */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  server: { port: 8000 },
  plugins: [react()],
  resolve: { alias: { '@': path.resolve(__dirname, 'src') } },
});
// https://vite.dev/config/
0;
