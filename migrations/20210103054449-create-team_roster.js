'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('team_roster', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      season: {
        type: Sequelize.STRING,
      },
      coach: {
        type: Sequelize.STRING,
      },
      win: {
        type: Sequelize.INTEGER,
      },
      loss: {
        type: Sequelize.INTEGER,
      },
      player_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'player',
          key: 'id',
        },
      },
      team_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'team',
          key: 'id',
        },
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('team_roster')
  },
}
