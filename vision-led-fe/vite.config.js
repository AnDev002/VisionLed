import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000,
        open: true
    },
    build: {
rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom']
        }
      }
    },
        chunkSizeWarningLimit: 8600 // Đặt giới hạn cảnh báo kích thước chunk lớn hơn, ví dụ 1000 kB

    },
resolve: {
    alias: [
        {
            find: /^~(.*)$/,
            replacement: 'node_modules/$1',
        },
    ],
},

});

