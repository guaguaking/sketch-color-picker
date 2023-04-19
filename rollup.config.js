const path = require('path')
// const json = require('@rollup/plugin-json')
const postcss = require('rollup-plugin-postcss')
const alias = require('@rollup/plugin-alias')
const terser = require('@rollup/plugin-terser')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const babel = require('@rollup/plugin-babel')

const name = 'sketch-color-picker.js';

module.exports = {
  input: 'src/main.js',
  output: [
    {
      file: `lib/sketch-color-picker.js`,
      format: 'umd',
      name: 'SketchColorPicker',
    },
    {
      file: `lib/sketch-color-picker.min.js`,
      format: 'umd',
      name: 'SketchColorPicker',
      plugins: [terser()]
    },
    {
      file: `es/${name}`,
      format: 'es',
    },
    // {
    //   file: `dist/${name}.cjs.js`,
    //   format: 'cjs',
    //   exports: 'auto'
    // }
  ],
  plugins: [
    alias({
      entries: [
        {
          find: '@',
          replacement: path.resolve(__dirname, 'src')
        }
      ],
      customResolver: nodeResolve({
        extensions: ['.mjs', '.js']
      })
    }),
    nodeResolve(),
    babel({ babelHelpers: 'bundled' }),
    // json(),
    // terser(),
    postcss()
  ],
  watch: {
    clearScreen: true,
    include: 'src/**'
  }
};