"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Stock extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Stock.belongsTo(models.Item, {
                foreignKey: {
                    name: "itemId",
                },
            });
            Stock.belongsTo(models.Company, {
                foreignKey: {
                    name: "companyId",
                },
            });
        }
    }

    Stock.init(
        {
            companyId: DataTypes.STRING,
            itemId: DataTypes.STRING,
            stock: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Stock",
        }
    );
    return Stock;
};
