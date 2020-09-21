import { DataTypes, Sequelize } from 'sequelize'
import { User } from './User'
import { Repo } from './Repo'

export const initModel = (sequelize: Sequelize): void => {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
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
  Repo.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      originalId: { type: DataTypes.STRING },
      name: { type: DataTypes.STRING },
      description: { type: DataTypes.STRING },
      homepageUrl: { type: DataTypes.STRING },
      url: { type: DataTypes.STRING },
      languages: { type: DataTypes.STRING },
      stargazers: { type: DataTypes.INTEGER },
      watchers: { type: DataTypes.INTEGER },
      forks: { type: DataTypes.INTEGER },
      createdAt: { type: DataTypes.DATE },
      scrapedAt: { type: DataTypes.DATE },
    },
    {
      tableName: 'repos',
      sequelize,
    }
  )
}
