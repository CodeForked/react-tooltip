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
      exports: 'auto',
      file: packageJson.main,
      format: 'cjs',
      sourcemap: true,
      name: 'react-tooltip'
    },
    {
      exports: 'auto',
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

    //DRAGONS: This guy is breaking/not playing well with eslint -- https://github.com/rollup/plugins/issues/1169
    //Plugin to convert CommonJS modules to ES6, so they can be included in a Rollup bundle
    //commonjs(),

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
