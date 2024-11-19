import { select, input } from '@inquirer/prompts'

import path from 'path'
import fs from 'fs-extra'
import log from '../utils/log'
import update from './update'
import { TemplateInfo } from '../utils/constants'
import { clone } from '../utils/clone'

export const templates: Map<string, TemplateInfo> = new Map([
  [
    'Vite-Vue3-Typescript-tempalte',
    {
      name: 'v3-admin-vite',
      downloadUrl: 'https://github.com/un-pany/v3-admin-vite.git',
      description: 'Vue3技术栈开发模板',
      branch: 'main',
    },
  ],
  [
    'Vite-Vue3-移动端模板',
    {
      name: 'v3-admin-vite',
      downloadUrl: 'https://github.com/un-pany/v3-admin-vite.git',
      description: 'Vue3技术栈开发模板',
      branch: 'main',
    },
  ],
])

// 是否覆盖
export const isOverwrite = async (fileName: string) => {
  log.warn(`${fileName}文件夹存在`)
  const overwrite = await select({
    message: '是否覆盖',
    choices: [
      { name: '覆盖', value: true },
      { name: '取消', value: false },
    ],
  })

  return overwrite
}

export default async (projectName?: string) => {
  // 初始化模板列表
  const templateList = Array.from(templates).map(
    (item: [string, TemplateInfo]) => {
      const [name, info] = item
      return {
        name,
        value: name,
        description: info.description,
      }
    }
  )

  if (!projectName) {
    projectName = await input({ message: '请输入项目名称' })
  }

  // 如果文件夹存在，则提示是否覆盖
  const filePath = path.resolve(process.cwd(), projectName)
  if (fs.existsSync(filePath)) {
    const run = await isOverwrite(projectName)
    if (run) {
      await fs.remove(filePath)
    } else {
      return // 不覆盖直接结束
    }
  }

  // 检查版本更新
  await update(false)

  const templateName = await select({
    message: '请选择模板',
    choices: templateList,
  })

  const info = templates.get(templateName)

  if (info) {
    clone(info.downloadUrl, projectName, ['-b', info.branch])
  }
}
