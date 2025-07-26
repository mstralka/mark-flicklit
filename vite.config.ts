import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {resolve} from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src/frontend'),
        },
    },
    root: '.',
    envDir: '.',
    server: {
        port: 5173,
        open: true,
    },
    build: {
        outDir: 'dist/frontend',
        sourcemap: true,
    },
})