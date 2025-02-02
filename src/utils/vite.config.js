import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        movie_page: resolve(__dirname, 'pages/movie_page/index.html'),
        actor_page: resolve(__dirname, 'pages/actor_page/index.html'),
      },
    },
  },
})