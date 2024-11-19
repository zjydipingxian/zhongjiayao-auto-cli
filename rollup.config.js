import { defineConfig } from 'rollup'
import typescript from '@rollup/plugin-typescript' // 解析TypeScript
import commonjs from '@rollup/plugin-commonjs' // 支持rollup打包commonjs模块
import { nodeResolve } from '@rollup/plugin-node-resolve' // 查找和打包node_modules中的第三方模
import json from '@rollup/plugin-json' // 支持rollup打包json文件
import terser from '@rollup/plugin-terser' // 压缩打包代码
import externals from 'rollup-plugin-node-externals'

import { fileURLToPath } from 'url'
import path from 'path'
const __filename = fileURLToPath(import.meta.url) // 获取当前模块的URL
const __dirname = path.dirname(__filename) // 提取目录名

export default defineConfig([
  {
    input: 'src/index.ts',
    output: {
      dir: 'dist', // 输出目标文件夹
      format: 'cjs', // 输出 commonjs 文件
    },
    plugins: [
      nodeResolve(),
      externals({
        devDeps: false, // 可以识别我们 package.json 中的依赖当作外部依赖处理 不会直接将其中引用的方法打包出来
      }),
      typescript({
        tsconfig: path.resolve(__dirname, './tsconfig.json'),
      }),
      json({ namedExports: false }),
      commonjs(),
      terser(),
    ],
  },
])
