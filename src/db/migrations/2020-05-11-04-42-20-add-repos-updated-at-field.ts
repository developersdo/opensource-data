import { QueryInterface, DataTypes } from 'sequelize'

export default {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    return queryInterface.addColumn('repos', 'updatedAt', {
      type: DataTypes.DATE,
    })
  },
  down: async (queryInterface: QueryInterface): Promise<void> => {
    return queryInterface.removeColumn('repos', 'updatedAt')
  },
}
