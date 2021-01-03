'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable('season_stats', 'season_average')
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable('season_average', 'season_stats')
  },
}
