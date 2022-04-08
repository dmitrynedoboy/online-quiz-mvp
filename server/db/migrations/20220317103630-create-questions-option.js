'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('QuestionsOptions', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			game_id: {
				type: Sequelize.INTEGER,
				references: {
					model: 'Games',
					key: 'id'
				}
			},
			question: {
				type: Sequelize.TEXT
			},
			answer: {
				type: Sequelize.STRING
			},
			option1: {
				type: Sequelize.STRING
			},
			option2: {
				type: Sequelize.STRING
			},
			option3: {
				type: Sequelize.STRING
			},
			option4: {
				type: Sequelize.STRING
			},
      img: {
        type: Sequelize.TEXT
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
		await queryInterface.dropTable('QuestionsOptions');
	}
};
