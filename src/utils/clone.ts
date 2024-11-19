import simpleGit, { SimpleGit, SimpleGitOptions } from 'simple-git'
import createLogger from 'progress-estimator'
import chalk from 'chalk'
import figlet from 'figlet'
import { PKG_NAME } from './constants'
import log from './log'
import npmType from './npm-type'

const gitOptions: Partial<SimpleGitOptions> = {
  baseDir: process.cwd(), // 设置基础目录为当前工作目录
  binary: 'git',
  maxConcurrentProcesses: 6, // 允许的最大并发进程数为 6
}

// 初始化进度条
const logger = createLogger({
  spinner: {
    interval: 300,
    frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'].map((item) =>
      // console.info(item)
      chalk.green(item)
    ),
  },
})

const goodPrinter = async () => {
  const data = await figlet(PKG_NAME)
  console.log(chalk.rgb(40, 156, 193).visible(data))
}

export const clone = async (
  url: string,
  projectName: string,
  options: string[]
) => {
  const git: SimpleGit = simpleGit(gitOptions)
  try {
    await logger(git.clone(url, projectName, options), '代码下载中: ', {
      estimate: 7000, // 预计下载时间
    })

    // 下面就是一些相关的提示
    goodPrinter()
    console.log()
    console.log(chalk.blueBright(`==================================`))
    console.log(chalk.blueBright(`=== 欢迎使用 ${PKG_NAME} 脚手架 ===`))
    console.log(chalk.blueBright(`==================================`))
    console.log()

    log.success(`项目创建成功 ${chalk.blueBright(projectName)}`)
    log.success(`执行以下命令启动项目：`)
    log.info(`cd ${chalk.blueBright(projectName)}`)

    const npm = await npmType

    log.info(`${chalk.yellow(`${npm}`)} install`)
    log.info(`${chalk.yellow(`${npm}`)} run dev`)
  } catch (error) {
    log.error(chalk.red(error))
  }
}
