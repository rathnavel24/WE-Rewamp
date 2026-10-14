/// <reference types="vitest/config" />
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) }
  },
  test: {
    // Unit tests sit next to the code they cover: foo.ts → foo.test.ts
    include: ['src/**/*.test.{ts,tsx}'],
    environment: 'node'
  }
});
