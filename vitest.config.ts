import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

export default defineConfig({
  plugins: [react()],
  test: {
    include: ['src/**/*.spec.ts'],
    environment: 'jsdom',
    coverage: {
      enabled: true,
      provider: 'v8',
      all: true,
      include: ['**/hooks/**/*.ts', '**/utils/**/*.ts', '**/types/**/*.ts'],
      reportsDirectory: 'test-reports',
    },
    env: dotenv.config({ path: '.env.test' }).parsed,
  },
});
