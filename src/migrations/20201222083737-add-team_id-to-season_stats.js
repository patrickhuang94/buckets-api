'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('season_stats', 'team_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'team',
        key: 'id',
      },
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('season_stats', 'team_id')
  },
}
