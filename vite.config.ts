import react from '@vitejs/plugin-react';
import {defineConfig} from 'vite';
import {resolve} from 'node:path';

const root = resolve(__dirname, 'src');
const fromRoot = (path: string): string => resolve(root, path);

export default defineConfig({
    plugins: [
        react(),
    ],
    server: {
        port: 8080,
    },
    build: {
        outDir       : fromRoot('../dist'),
        emptyOutDir  : true,
        target       : 'esnext',
        rollupOptions: {
            input: {
                main: fromRoot('../index.html'),
            },
        },
    },
});
