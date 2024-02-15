import { defineConfig } from 'vite';
import * as path from 'path';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3030,
  },

  preview: {
    port: 8080,
  },

  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate', // Automatically check for updates
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.mode === 'navigate',
            handler: 'NetworkFirst',
            options: {
              // Configure cache options here if needed
            },
          },
        ],
      },
    }),
  ],

  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, './src') }],
  },

  build: {
    sourcemap: true,

    rollupOptions: {
      onLog(level, log, handler) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (log.cause && log.cause.message === `Can't resolve original location of error.`) {
          return;
        }
        handler(level, log);
      },
    },
  },
});
