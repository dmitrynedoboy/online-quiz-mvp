'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class UserInRoom extends Model {
		/**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
		static associate(models) {
			// define association here
			this.belongsTo(models.User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
			this.belongsTo(models.Room, { foreignKey: 'room_id', onDelete: 'CASCADE' });
		}
	}
	UserInRoom.init(
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER
			},
			user_id: {
				type: DataTypes.INTEGER,
				references: {
					model: 'Users',
					key: 'id'
				}
			},
			room_id: {
				type: DataTypes.INTEGER,
				references: {
					model: 'Rooms',
					key: 'id'
				}
			},
			is_creator: {
				type: DataTypes.BOOLEAN
			},
			socket_id: {
				type: DataTypes.STRING
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
			modelName: 'UserInRoom'
		}
	);
	return UserInRoom;
};
