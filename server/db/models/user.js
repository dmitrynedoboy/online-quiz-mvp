'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
		static associate(models) {
			// define association here
			this.belongsToMany(models.Room, { through: models.UserInRoom, foreignKey: 'user_id' }); // РАБОЧАЯ СВЯЗЬ, НЕ УБИРАТЬ
			this.hasMany(models.UserInRoom, { foreignKey: 'user_id', onDelete: 'CASCADE' });
			this.hasMany(models.FinishedQuestion, { foreignKey: 'user_id' });
		}
	}
	User.init(
		{
			username: DataTypes.STRING,
			email: DataTypes.STRING,
			password: DataTypes.STRING,
			avatar_url: DataTypes.STRING
		},
		{
			sequelize,
			modelName: 'User'
		}
	);
	return User;
};
