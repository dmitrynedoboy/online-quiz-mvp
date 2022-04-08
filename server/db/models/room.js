'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Room extends Model {
		/**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
		static associate(models) {
			// define association here
			this.belongsTo(models.Topic, { foreignKey: 'topic_id' }); // РАБОЧАЯ СВЯЗЬ, НЕ УБИРАТЬ
			this.belongsTo(models.Game, { foreignKey: 'game_id' }); // РАБОЧАЯ СВЯЗЬ, НЕ УБИРАТЬ
			this.belongsToMany(models.User, { through: models.UserInRoom, foreignKey: 'room_id' }); // РАБОЧАЯ СВЯЗЬ, НЕ УБИРАТЬ
			this.hasMany(models.UserInRoom, { foreignKey: 'room_id', onDelete: 'CASCADE' });
			this.hasMany(models.FinishedQuestion, { foreignKey: 'room_id' });
		}
	}
	Room.init(
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER
			},
			room_hash: {
				type: DataTypes.STRING
			},
			name: {
				type: DataTypes.STRING
			},
			game_id: {
				type: DataTypes.INTEGER,
				references: {
					model: 'Games',
					key: 'id'
				}
			},
			status: {
				type: DataTypes.STRING
			},
			max_players: {
				type: DataTypes.INTEGER
			},
			password: {
				type: DataTypes.STRING
			},
			topic_id: {
				type: DataTypes.INTEGER,
				references: {
					model: 'Topics',
					key: 'id'
				}
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
			modelName: 'Room'
		}
	);
	return Room;
};
