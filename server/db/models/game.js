'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Game extends Model {
		/**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
		static associate(models) {
			// define association here
			this.hasMany(models.Room, { foreignKey: 'game_id' }); // РАБОЧАЯ СВЯЗЬ, НЕ УБИРАТЬ
		}
	}
	Game.init(
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER
			},
			topic_id: {
				type: DataTypes.INTEGER,
				references: {
					model: 'Topics',
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
			title: {
				type: DataTypes.STRING
			},
			description: {
				type: DataTypes.TEXT
			},
			img_url: {
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
			modelName: 'Game'
		}
	);
	return Game;
};
