import { Sequelize, Options } from 'sequelize'
import { initModel } from './models/init'
import config from './config.json'
import { createDebug } from '../utils/debug'

const debug = createDebug(__filename)

type Config = {
  [key: string]: Options
}

const envConfig = (config as Config)[process.env.NODE_ENV || 'development']

export const connection = new Sequelize({
  ...envConfig,
  logging: envConfig.logging && ((query: string): void => debug(query)),
})

initModel(connection)
