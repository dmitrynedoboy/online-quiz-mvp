'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			'Topics',
			[
				{
					title: 'Топовые вопросы',
					description: 'Самые лучшие вопросы',
					img: 'top',
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					title: 'Искусство',
					description: 'Вопросы про искусство',
					img: 'art',
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					title: 'География',
					description: 'Вопросы про географию',
					img: 'geo',
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					title: 'Спорт',
					description: 'Вопросы про спорт',
					img: 'sport',
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					title: 'Война',
					description: 'Вопросы про войну',
					img: 'war',
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					title: 'Литература',
					description: 'Вопросы про литературу',
					img: 'lit',
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					title: 'Точные науки',
					description: 'Вопросы про точные науки',
					img: 'sci',
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					title: 'Театр и кино',
					description: 'Вопросы про театр и кино',
					img: 'film',
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					title: 'Светская жизнь',
					description: 'Вопросы про светскую жизнь',
					img: 'svet',
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					title: 'История',
					description: 'Вопросы про историю',
					img: 'hist',
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					title: 'Случайные вопросы',
					description: 'Вопросы случая',
					img: 'rand',
					createdAt: new Date(),
					updatedAt: new Date()
				}
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Topics', null, {});
	}
};
