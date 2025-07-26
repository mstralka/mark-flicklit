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
        rollupOptions: {
            output: {
                manualChunks: {
                    // Separate vendor libraries into their own chunks
                    'react-vendor': ['react', 'react-dom'],
                    'router-vendor': ['react-router-dom'],
                    'form-vendor': ['react-hook-form', '@hookform/resolvers', 'zod'],
                    'ui-vendor': ['@headlessui/react', '@heroicons/react'],
                    'auth-components': [
                        './src/frontend/components/auth/LoginForm',
                        './src/frontend/components/auth/RegisterForm', 
                        './src/frontend/components/auth/ResetPasswordForm',
                        './src/frontend/components/auth/EmailVerification'
                    ],
                },
                // Optimize chunk file names
                chunkFileNames: 'assets/[name]-[hash].js',
                entryFileNames: 'assets/[name]-[hash].js',
                assetFileNames: 'assets/[name]-[hash].[ext]'
            }
        },
        // Increase chunk size warning limit since we're now splitting properly
        chunkSizeWarningLimit: 600,
    },
})