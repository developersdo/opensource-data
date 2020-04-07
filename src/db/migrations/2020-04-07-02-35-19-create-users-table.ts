import { QueryInterface, DataTypes } from 'sequelize'

export default {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    return queryInterface.createTable('users', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      originalId: { type: DataTypes.STRING },
      login: { type: DataTypes.STRING, unique: 'usersLoginIndex' },
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
      sources: { type: DataTypes.INTEGER },
      forked: { type: DataTypes.INTEGER },
      collaborations: { type: DataTypes.INTEGER },
    })
  },
  down: async (queryInterface: QueryInterface): Promise<void> => {
    queryInterface.dropTable('users')
  },
}
