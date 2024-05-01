const bcrypt = require("bcrypt");
const { User } = require("../models/");
const JWT = require("../Helper/JSONWebToken");

class Controller {
    static async register(req, res, next) {
        const { email, password, username } = req.body;
        try {
            if (!email || !password || !username) {
                throw {
                    name: "BadRequest",
                    message: "Email, password and username must be filled",
                };
            }
            await User.create({
                email,
                name: username,
                password: bcrypt.hashSync(password, 10),
                admin: false,
            });
            res.status(201).json({
                message: `Account ${username} created successfully`,
            });
        } catch (error) {
            next(error);
        }
    }

    static async login(req, res, next) {
        const { email, password } = req.body;
        try {
            if (!email || !password) {
                throw {
                    name: "BadRequest",
                    message: "Email and password must be filled",
                };
            }
            const userData = await User.findOne({
                where: {
                    email,
                },
            });
            if (userData.dataValues) {
                const bcryptValue = bcrypt.compareSync(
                    password,
                    userData.password
                );
                if (bcryptValue) {
                    res.status(200).json({
                        message: `Welcome ${userData.name}`,
                        jwt: JWT.sign({
                            id: userData.id,
                            username: userData.name,
                            email: userData.email,
                            admin: userData.admin,
                        }),
                    });
                } else {
                    throw {
                        name: "BadRequest",
                        message: "Invalid email/password",
                    };
                }
            } else {
                throw {
                    name: "BadRequest",
                    message: "Invalid email/password",
                };
            }
        } catch (error) {
            next(error);
        }
    }

    static async addPhone(req, res, next) {
        const {
            brand,
            type,
            color,
            price,
            processor,
            ramCapacity,
            storageCapacity,
            screenSize,
            screenResolution,
            mainCameraResolution,
            frontCameraResolution,
            batteryCapacity,
            operatingSystem,
        } = req.body;
        const { id: userId } = req.userData;
        try {
            if (!userId) {
                throw {
                    name: "UserIdNotFound",
                    message: "userId not found",
                };
            }

            if (!brand || !type || !color || !price) {
                throw {
                    name: "BadRequest",
                    message: "brand, type, color and price must be filled",
                };
            }

            if (isNaN(Number(price)) || price < 0) {
                throw {
                    name: "BadRequest",
                    message: "price must be a non-negative number",
                };
            }

            const phoneData = {
                brand,
                type,
                color,
                price,
                processor,
                ramCapacity,
                storageCapacity,
                screenSize,
                screenResolution,
                mainCameraResolution,
                frontCameraResolution,
                batteryCapacity,
                operatingSystem,
                userId,
            };

            const phone = await Phone.create(phoneData);

            res.status(201).json({
                message: `Added product phone ${phone.brand} successfully`,
                phone: phone.toJSON(),
            });
        } catch (error) {
            next(error);
        }
    }

    static async deletePhone(req, res, next) {
        const { id } = req.params;
        const { id: userId } = req.userData;
        try {
            if (isNaN(Number(id)) || id < 1) {
                throw {
                    name: "BadRequest",
                    message: "ID must be a positive integer",
                };
            }

            const phone = await Phone.findByPk(id);
            if (!phone) {
                throw {
                    name: "BadRequest",
                    message: `Phone not found with the provided ID ${id}`,
                };
            }

            if (phone.id != userId) {
                throw {
                    name: "notAuthorized",
                    message: "You are not authorized to access this phone data",
                };
            }

            await Phone.destroy({
                where: {
                    id,
                },
            });

            res.json({
                message: `Delete product phone ${phone.brand} successfully`,
                phone: phone.toJSON(),
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = Controller;
