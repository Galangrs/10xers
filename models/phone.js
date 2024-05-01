"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Phone extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Product.belongsTo(models.User, {
                foreignKey: "userId",
            });
        }
    }
    Phone.init(
        {
            brand: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "Brand is required",
                    },
                    notEmpty: {
                        msg: "Brand is required",
                    },
                },
            },
            type: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "Type is required",
                    },
                    notEmpty: {
                        msg: "Type is required",
                    },
                },
            },
            color: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "Color is required",
                    },
                    notEmpty: {
                        msg: "Color is required",
                    },
                },
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "Price is required",
                    },
                    notEmpty: {
                        msg: "Price is required",
                    },
                },
            },
            processor: DataTypes.STRING,
            ramCapacity: DataTypes.INTEGER,
            storageCapacity: DataTypes.INTEGER,
            screenSize: DataTypes.STRING,
            screenResolution: DataTypes.STRING,
            mainCameraResolution: DataTypes.STRING,
            frontCameraResolution: DataTypes.STRING,
            batteryCapacity: DataTypes.INTEGER,
            operatingSystem: DataTypes.STRING,
            userId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Phone",
        }
    );
    return Phone;
};
