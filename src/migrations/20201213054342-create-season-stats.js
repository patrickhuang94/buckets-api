'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('season_stats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      season: { type: Sequelize.STRING },
      games_played: { type: Sequelize.INTEGER },
      games_started: { type: Sequelize.INTEGER },
      minutes_played: { type: Sequelize.FLOAT },
      field_goals: { type: Sequelize.FLOAT },
      field_goal_attempts: { type: Sequelize.FLOAT },
      field_goal_pct: { type: Sequelize.FLOAT },
      three_point_field_goals: { type: Sequelize.FLOAT },
      three_point_field_goal_attempts: { type: Sequelize.FLOAT },
      three_point_field_goal_pct: { type: Sequelize.FLOAT },
      two_point_field_goals: { type: Sequelize.FLOAT },
      two_point_field_goal_attempts: { type: Sequelize.FLOAT },
      two_point_field_goal_pct: { type: Sequelize.FLOAT },
      effective_field_goal_pct: { type: Sequelize.FLOAT },
      free_throws: { type: Sequelize.FLOAT },
      free_throw_attempts: { type: Sequelize.FLOAT },
      free_throw_pct: { type: Sequelize.FLOAT },
      offensive_rebounds: { type: Sequelize.FLOAT },
      defensive_rebounds: { type: Sequelize.FLOAT },
      total_rebounds: { type: Sequelize.FLOAT },
      assists: { type: Sequelize.FLOAT },
      steals: { type: Sequelize.FLOAT },
      blocks: { type: Sequelize.FLOAT },
      turnovers: { type: Sequelize.FLOAT },
      fouls: { type: Sequelize.FLOAT },
      points: { type: Sequelize.FLOAT },
      player_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'player',
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
    await queryInterface.dropTable('season_stats')
  },
}
