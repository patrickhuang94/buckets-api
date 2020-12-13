'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Player', 'team_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Team',
        key: 'id',
      },
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Player', 'team_id')
  },
}
