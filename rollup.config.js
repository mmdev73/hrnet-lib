import typescript from '@rollup/plugin-typescript';
import sass from 'rollup-plugin-sass';
import url from '@rollup/plugin-url';
import dts from 'rollup-plugin-dts';
export default [
  {
    input: 'src/index.js',
    output: {
      file: 'dist/index.js',
      format: 'es',
      exports: 'named',
      sourcemap: true,
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM'
      },
    },
    external: ['react', 'react-dom'],
    plugins: [
      typescript(),
      sass({
        output: 'dist/index.css',
        options: {
          outputStyle: 'compressed',
          silenceDeprecations: [
            'legacy-js-api'
          ]
        }
      }),
      url({
        include: ['**/*.png'],
        limit: 8192,
        emitFiles: true,
        fileName: '[name][hash][extname]',
      }),
    ]
  },
  {
    input: 'src/index.js',
    output: {
      file: 'dist/index.d.ts',
      format: 'es',
    },
    plugins: [
      dts(),
      sass({
        output: 'dist/index.css',
        options: {
          outputStyle: 'compressed',
          silenceDeprecations: [
            'legacy-js-api'
          ]
        }
      }),
      url({
        include: ['**/*.png'],
        limit: 8192,
        emitFiles: true,
        fileName: '[name][hash][extname]',
      }),
    ]
  }
]