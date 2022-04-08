'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class FinishedQuestion extends Model {
		/**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
		static associate(models) {
			// define association here
			this.belongsTo(models.Room, { foreignKey: 'room_id' });
			this.belongsTo(models.User, { foreignKey: 'user_id' });
		}
	}
	FinishedQuestion.init(
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER
			},
			room_id: {
				type: DataTypes.INTEGER,
				references: {
					model: 'Room',
					key: 'id'
				}
			},
			user_id: {
				type: DataTypes.INTEGER,
				references: {
					model: 'Users',
					key: 'id'
				}
			},
			is_solved: {
				type: DataTypes.BOOLEAN
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
			modelName: 'FinishedQuestion'
		}
	);
	return FinishedQuestion;
};
