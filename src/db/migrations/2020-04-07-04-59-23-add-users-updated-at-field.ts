import { QueryInterface, DataTypes } from 'sequelize'

export default {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    return queryInterface.addColumn('users', 'updatedAt', {
      type: DataTypes.DATE,
    })
  },
  down: async (queryInterface: QueryInterface): Promise<void> => {
    return queryInterface.removeColumn('users', 'updatedAt')
  },
}
