import { rollup } from 'rollup';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify-es';

export default {
  moduleName: 'foo',
  entry: 'app/src/main.js',
  format: 'umd',
  dest: 'app/scripts/bundle.js',
  plugins: [
    resolve({ jsnext: true, main: true }),
    commonjs(),
    uglify()
  ]
};
