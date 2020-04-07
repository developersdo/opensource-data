import { QueryInterface, DataTypes } from 'sequelize'

export default {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    return queryInterface.createTable('table', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
    })
  },
  down: async (queryInterface: QueryInterface): Promise<void> => {
    return queryInterface.dropTable('table')
  },
}
