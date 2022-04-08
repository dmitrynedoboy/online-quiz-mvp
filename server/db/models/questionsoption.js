'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class QuestionsOption extends Model {
		/**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
		static associate(models) {
			// define association here
		}
	}
	QuestionsOption.init(
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER
			},
			game_id: {
				type: DataTypes.INTEGER,
				references: {
					model: 'Games',
					key: 'id'
				}
			},
			question: {
				type: DataTypes.TEXT
			},
			answer: {
				type: DataTypes.STRING
			},
			option1: {
				type: DataTypes.STRING
			},
			option2: {
				type: DataTypes.STRING
			},
			option3: {
				type: DataTypes.STRING
			},
			option4: {
				type: DataTypes.STRING
			},
			img: {
				type: DataTypes.TEXT
			},
			createdAt: {
				allowNull: false,
				type: DataTypes.DATE
			},
			updatedAt: {
				allowNull: false,
				type: DataTypes.DATE
			}
		},
		{
			sequelize,
			modelName: 'QuestionsOption'
		}
	);
	return QuestionsOption;
};
