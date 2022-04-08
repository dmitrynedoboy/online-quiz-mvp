'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			'Users',
			[
				{
					username: 'Lexa',
					email: 'lexa@lexa.ru',
					password: 'lexapass',
					avatar_url: 'https://i.pinimg.com/736x/e6/5c/ac/e65cac1a1a8c08af9675b6e86e169998.jpg',
					createdAt: new Date(),
					updatedAt: new Date()
				}
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Users', null, {});
	}
};
