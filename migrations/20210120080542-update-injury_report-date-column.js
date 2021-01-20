'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('injury_report', 'date', {
      type: Sequelize.DATEONLY,
    })
    await queryInterface.renameColumn('injury_report', 'date', 'date_reported')
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('injury_report', 'date_reported', 'date')
    await queryInterface.changeColumn('injury_report', 'date', {
      type: Sequelize.DATE,
    })
  },
}
