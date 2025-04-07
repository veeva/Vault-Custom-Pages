import * as esbuild from 'esbuild';

await esbuild.build({
    entryPoints: ['src/index.tsx'],
    bundle: true,
    outdir: 'dist',
    format: 'esm',
    sourcemap: true,
    minify: true,
});
