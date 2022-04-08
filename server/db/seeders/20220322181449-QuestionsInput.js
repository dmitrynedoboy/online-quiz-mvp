'use strict';
const qa = require('./qa.json');

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert('QuestionsInputs', qa, {});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('QuestionsInputs', null, {});
	}
};
