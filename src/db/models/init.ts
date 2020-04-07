import { DataTypes, Sequelize } from 'sequelize'
import { User } from './User'

export const initModel = (sequelize: Sequelize): void => {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      originalId: { type: DataTypes.STRING },
      login: { type: DataTypes.STRING },
      name: { type: DataTypes.STRING },
      type: { type: DataTypes.STRING },
      url: { type: DataTypes.STRING },
      avatarUrl: { type: DataTypes.STRING },
      company: { type: DataTypes.STRING },
      location: { type: DataTypes.STRING },
      createdAt: { type: DataTypes.DATE },
      scrapedAt: { type: DataTypes.DATE },
      followers: { type: DataTypes.INTEGER },
      following: { type: DataTypes.INTEGER },
    },
    {
      tableName: 'users',
      sequelize,
    }
  )
}
