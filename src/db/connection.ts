import { Sequelize, Options } from 'sequelize'
import { initModel } from './models/init'
import config from './config.json'

type Config = {
  [key: string]: Options
}

export const connection = new Sequelize({
  ...(config as Config)[process.env.NODE_ENV || 'development'],
})

initModel(connection)
