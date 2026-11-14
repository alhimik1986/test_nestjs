import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { env } from 'process';

if (! env?.VITE_API_URL) {
  throw new Error('VITE_API_URL is not defined');
}

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    allowedHosts: ['alhimik1986.ru'],
    proxy: {
      '/graphql': {
        target: env.VITE_API_URL,
        changeOrigin: true,
        secure: false, // Раскомментируйте, если target использует самоподписанный HTTPS
      },
    },
  },
});
