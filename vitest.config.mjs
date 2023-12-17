import { defineConfig } from 'vitest/config';

/**
 * @type {import('vitest/config').Config}
 */
export default defineConfig({
  test: {
    root: './',
    include: ['src/**/*.spec.ts'],
    coverage: {
      enabled: true,
      include: ['src/**/*.ts'],
      extension: ['.ts'],
    },
    typecheck: {
      enabled: true
    },
    globals: true,
    watch: false
  }
});
