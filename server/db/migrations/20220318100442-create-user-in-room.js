'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('UserInRooms', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			user_id: {
				type: Sequelize.INTEGER,
				onDelete: 'CASCADE',
				references: {
					model: 'Users',
					key: 'id'
				}
			},
			room_id: {
				type: Sequelize.INTEGER,
				onDelete: 'CASCADE',
				references: {
					model: 'Rooms',
					key: 'id'
				}
			},
			is_creator: {
				type: Sequelize.BOOLEAN
			},
			socket_id: {
				type: Sequelize.STRING
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
		await queryInterface.dropTable('UserInRooms');
	}
};
