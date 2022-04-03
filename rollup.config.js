import commonjs from '@rollup/plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

import sass from 'rollup-plugin-sass';
import url from '@rollup/plugin-url';
import eslint from '@rbnlffl/rollup-plugin-eslint';
//import stylelint from 'rollup-plugin-stylelint';
import svgr from '@svgr/rollup';

/* postCSS plugins */
import simplevars from 'postcss-simple-vars';
import nested from 'postcss-nested';

import packageJson from './package.json';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
      sourcemap: true,
      name: 'react-tooltip'
    },
    {
      file: packageJson.module,
      format: 'esm',
      sourcemap: true
    }
  ],
  plugins: [
    eslint({
      throwOnError: false,
      throwOnWarning: false
    }),
    external(), // Automatically externalize peerDependencies in a rollup bundle.
    typescript(),
    commonjs(),

    // stylelint({
    //   throwOnError: false,
    //   throwOnWarning: false
    // }),
    postcss({
      plugins: [simplevars(), nested()],
      modules: true
    }),
    sass({ insert: false }), // will output compiled styles to output.css
    url(),
    svgr(),
    terser({
      mangle: false
    }) // minify es bundle
  ],
  external: ['prop-types', 'uuid']
};
