import path from 'path'
import fs from 'fs-extra'

export enum UNICODE {
  success = '\u2714', // ✔
  failure = '\u2716', // ✖
}

// 读取 package.json
console.log(
  "🚀 ~ path.resolve(__dirname, '../package.json'):",
  path.resolve(__dirname, '../package.json')
)

export const pkg = fs.readJSONSync(path.resolve(__dirname, '../package.json'))

/**
 * 包名
 */
export const PKG_NAME: string = pkg.name

/**
 * 包版本号
 */
export const PKG_VERSION: string = pkg.version

export interface TemplateInfo {
  name: string // 模板名称
  downloadUrl: string // 模板下载地址
  description: string // 模板描述
  branch: string // 模板分支
}
