import type {BuildOptions} from 'esbuild';

export default {
    entryPoints      : ['lambda/index.ts'],
    format           : 'cjs',
    platform         : 'node',
    target           : 'node20.10',
    outdir           : 'dist/lambda',
    loader           : {'.html': 'text', '.css': 'text'},
    bundle           : true,
    minifySyntax     : true,
    minifyWhitespace : true,
    minifyIdentifiers: false,
    keepNames        : true,
    sourcemap        : true,
    sourcesContent   : false,
    logLevel         : 'info',
} satisfies BuildOptions;
