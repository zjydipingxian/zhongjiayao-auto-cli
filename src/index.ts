#! /usr/bin/env node
import { program } from 'commander'
import { PKG_NAME, PKG_VERSION } from './utils/constants'
import update from './command/update'
import create from './command/create'

program.version(PKG_VERSION)

program
  .command('create')
  .description('创建一个新项目')
  .argument('[name]', '项目名称')
  .action(async (name) => {
    await create(name)
  })

program
  .command('update')
  .description(`更新 ${PKG_NAME} 至最新版本`)
  .option('-u, --update <type>', 'update')
  .action(async () => {
    update(true)
  })

program.parse()
