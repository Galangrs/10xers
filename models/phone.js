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
            Phone.belongsTo(models.User, {
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
                    isNumeric: {
                        msg: "price is Number cannot String",
                    },
                },
            },
            processor: DataTypes.STRING,
            ramCapacity: {
                type: DataTypes.INTEGER,
                validate: {
                    isNumeric: {
                        msg: "ramCapacity is Number cannot String",
                    },
                },
            },
            storageCapacity: {
                type: DataTypes.INTEGER,
                validate: {
                    isNumeric: {
                        msg: "storageCapacity is Number cannot String",
                    },
                },
            },
            screenSize: DataTypes.STRING,
            screenResolution: DataTypes.STRING,
            mainCameraResolution: DataTypes.STRING,
            frontCameraResolution: DataTypes.STRING,
            batteryCapacity: {
                type: DataTypes.INTEGER,
                validate: {
                    isNumeric: {
                        msg: "batteryCapacity is Number cannot String",
                    },
                },
            },
            operatingSystem: DataTypes.STRING,
            userId: {
                type: DataTypes.INTEGER,
                validate: {
                    isNumeric: {
                        msg: "userId is Number cannot String",
                    },
                },
            },
        },
        {
            sequelize,
            modelName: "Phone",
        }
    );
    return Phone;
};
