'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class QuestionsInput extends Model {
		/**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
		static associate(models) {
			// define association here
		}
	}
	QuestionsInput.init(
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
			answer: {
				type: DataTypes.STRING
			},
			question: {
				type: DataTypes.TEXT
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
			modelName: 'QuestionsInput'
		}
	);
	return QuestionsInput;
};
