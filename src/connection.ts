import path from 'path'
import { Sequelize } from 'sequelize'

export const connection = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, './data.sqlite'),
})
