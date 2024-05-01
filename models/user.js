"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            User.hasMany(models.Phone, {
                foreignKey: "userId",
            });
        }
    }
    User.init(
        {
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: {
                    msg: "Email must be unique",
                },
                validate: {
                    notNull: {
                        msg: "Email is required",
                    },
                    notEmpty: {
                        msg: "Email is required",
                    },
                    isEmail: {
                        msg: "Invalid email format",
                    },
                },
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "Password is required",
                    },
                    notEmpty: {
                        msg: "Password is required",
                    },
                },
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: {
                    msg: "Username must be unique",
                },
                validate: {
                    notNull: {
                        msg: "Username is required",
                    },
                    notEmpty: {
                        msg: "Username is required",
                    },
                },
                isOneWord(value) {
                    if (!/^[a-zA-Z0-9]+$/.test(value)) {
                        throw new Error(
                            "Username must contain only letters (A-Z, a-z) and numbers (0-9)"
                        );
                    }
                },
            },
            admin: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: "User",
        }
    );
    return User;
};
