import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000,
        open: true
    },
    build: {
        minify: 'esbuild', 
        target: 'es2015',
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ['react', 'react-dom', 'react-router-dom', 'lodash'],
                    mui: ['@mui/material', '@mui/icons-material', '@mui/system', '@mui/x-data-grid'],
                    redux: ['@reduxjs/toolkit', 'react-redux', 'redux-persist'],
                    query: ['@tanstack/react-query', '@tanstack/react-query-devtools', 'axios'],
                    ui: ['browser-image-compression', 'jwt-decode', 'prop-types', 'lovedicons', 'rc-footer', 'react-image-gallery', 'react-parallax', 'react-sticky-box', 'styled-components', 'swiper']
                }
            }
        },
        terserOptions: {
            compress: {
              drop_console: true,
            },
          },      
        chunkSizeWarningLimit: 5000 
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

