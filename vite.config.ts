import react from '@vitejs/plugin-react';
import { defineConfig as defineVitestConfig } from 'vitest/config';

// https://vite.dev/config/
export default defineVitestConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tools/vitest/setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/**/*.ts', 'src/**/*.tsx'],
      exclude: [
        '**/index.ts',
        '**/src/*.ts',
        '**/src/*.tsx',
        '**/*.factory.ts',
        '**/__factories__/**',
        '**/*.template.tsx',
        '**/*.skeleton.tsx',
        '**/tools/**',
        '**/*.d.ts',
      ],
    },
  },
});
