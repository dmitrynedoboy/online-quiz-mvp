'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Rooms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      room_hash: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },
      game_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Games',
          key: 'id'
        }
      },
      status: {
        type: Sequelize.STRING,
      },
      max_players: {
        type: Sequelize.INTEGER,
      },
      password: {
        type: Sequelize.STRING,
      },
      topic_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Topics',
          key: 'id'
        }

      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('Rooms');
	}
};
