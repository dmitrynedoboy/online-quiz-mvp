'use strict';
const qa = require('./qaopt.json');

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert('QuestionsOptions', qa, {});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('QuestionsOptions', null, {});
	}
};
