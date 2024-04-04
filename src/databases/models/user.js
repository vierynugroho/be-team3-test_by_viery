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
			User.hasOne(models.Auth, {
				foreignKey: {
					name: 'userId',
				},
			});

			User.hasMany(models.Item, {
				foreignKey: {
					name: 'userId',
				},
			});

			User.belongsTo(models.Company, {
				foreignKey: {
					name: 'companyId',
				},
			});
		}
	}

	User.init(
		{
			name: DataTypes.STRING,
			role: DataTypes.ENUM('admin', 'user'),
			companyId: DataTypes.STRING,
			imageUrl: DataTypes.ARRAY(DataTypes.TEXT),
			imageId: DataTypes.ARRAY(DataTypes.TEXT),
		},
		{
			sequelize,
			modelName: 'User',
		}
	);
	return User;
};
