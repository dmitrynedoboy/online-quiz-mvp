'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Topic extends Model {
		/**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
		static associate(models) {
			// define association here
			this.hasOne(models.Room, { foreignKey: 'topic_id' }); // РАБОЧАЯ СВЯЗЬ, НЕ УБИРАТЬ
		}
	}
	Topic.init(
		{
			title: DataTypes.STRING,
			description: DataTypes.TEXT,
			img: DataTypes.TEXT
		},
		{
			sequelize,
			modelName: 'Topic'
		}
	);
	return Topic;
};
