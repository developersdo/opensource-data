import { QueryInterface, DataTypes } from 'sequelize'

export default {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    return queryInterface.createTable('repos', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
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
    })
  },
  down: async (queryInterface: QueryInterface): Promise<void> => {
    return queryInterface.dropTable('repos')
  },
}
