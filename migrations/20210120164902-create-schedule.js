'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('schedule', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      game_time: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      game_date: {
        allowNull: false,
        type: Sequelize.DATEONLY,
      },
      home_team_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'team',
          key: 'id',
        },
      },
      visitor_team_id: {
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
    await queryInterface.dropTable('schedule')
  },
}
