// https://cn.rollupjs.org/configuration-options/
const path = require('path')
const postcss = require('rollup-plugin-postcss')
const alias = require('@rollup/plugin-alias')
const terser = require('@rollup/plugin-terser')
const resolve = require('@rollup/plugin-node-resolve')
const babel = require('@rollup/plugin-babel')

// const name = 'sketch-color-picker.js';

module.exports = {
  input: 'src/main.js',
  output: [
    {
      file: `dist/sketch-color-picker.js`,
      format: 'umd',
      name: 'SketchColorPicker',
    },
    {
      file: `dist/sketch-color-picker.min.js`,
      format: 'umd',
      name: 'SketchColorPicker',
      plugins: [terser()]
    },
    // {
    //   file: `es/${name}`,
    //   format: 'es',
    // },
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
      customResolver: resolve({
        extensions: ['.mjs', '.js']
      })
    }),
    resolve(),
    babel({ babelHelpers: 'bundled' }),
    postcss()
  ],
  watch: {
    clearScreen: true,
    include: 'src/**'
  }
};