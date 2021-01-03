'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('player', 'team_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'team',
        key: 'id',
      },
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('player', 'team_id')
  },
}
