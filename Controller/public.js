const bcrypt = require("bcrypt");
const { User, Phone } = require("../models/");
const JWT = require("../Helper/JSONWebToken");
const { Op } = require("sequelize");

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
            if (userData) {
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
        const { id: userId, admin } = req.userData;
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
                    name: "404NotFound",
                    message: `Phone not found with the provided ID ${id}`,
                };
            }

            if (phone.id != userId && admin === false) {
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

    static async editPhone(req, res, next) {
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
        const { id } = req.params;
        const { id: userId, admin } = req.userData;
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
                    name: "404NotFound",
                    message: `Phone not found with the provided ID ${id}`,
                };
            }

            if (phone.id != userId && admin === false) {
                throw {
                    name: "notAuthorized",
                    message: "You are not authorized to access this phone data",
                };
            }

            await Phone.update(
                {
                    brand: brand || phone.brand,
                    type: type || phone.type,
                    color: color || phone.color,
                    price: price || phone.price,
                    processor: processor || phone.processor,
                    ramCapacity: ramCapacity || phone.ramCapacity,
                    storageCapacity: storageCapacity || phone.storageCapacity,
                    screenSize: screenSize || phone.screenSize,
                    screenResolution:
                        screenResolution || phone.screenResolution,
                    mainCameraResolution:
                        mainCameraResolution || phone.mainCameraResolution,
                    frontCameraResolution:
                        frontCameraResolution || phone.frontCameraResolution,
                    batteryCapacity: batteryCapacity || phone.batteryCapacity,
                    operatingSystem: operatingSystem || phone.operatingSystem,
                },
                {
                    where: {
                        id,
                    },
                }
            );

            res.json({
                message: `Edit product phone ${phone.brand} successfully`,
                phone: phone.toJSON(),
            });
        } catch (error) {
            next(error);
        }
    }

    static async sercPhone(req, res, next) {
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
        } = req.query;

        try {
            const whereClause = {
                [Op.or]: [
                    brand !== undefined && brand !== "" && brand !== "null"
                        ? { brand: { [Op.iLike]: `%${brand}%` } }
                        : undefined,
                    type !== undefined && type !== "" && type !== "null"
                        ? { type: { [Op.iLike]: `%${type}%` } }
                        : undefined,
                    color !== undefined && color !== "" && color !== "null"
                        ? { color: { [Op.iLike]: `%${color}%` } }
                        : undefined,
                    price !== undefined && price !== "" && price !== "null"
                        ? { price: { [Op.iLike]: `%${price}%` } }
                        : undefined,
                    processor !== undefined &&
                    processor !== "" &&
                    processor !== "null"
                        ? { processor: { [Op.iLike]: `%${processor}%` } }
                        : undefined,
                    ramCapacity !== undefined &&
                    ramCapacity !== "" &&
                    ramCapacity !== "null"
                        ? { ramCapacity: { [Op.iLike]: `%${ramCapacity}%` } }
                        : undefined,
                    storageCapacity !== undefined &&
                    storageCapacity !== "" &&
                    storageCapacity !== "null"
                        ? {
                              storageCapacity: {
                                  [Op.iLike]: `%${storageCapacity}%`,
                              },
                          }
                        : undefined,
                    screenSize !== undefined &&
                    screenSize !== "" &&
                    screenSize !== "null"
                        ? { screenSize: { [Op.iLike]: `%${screenSize}%` } }
                        : undefined,
                    screenResolution !== undefined &&
                    screenResolution !== "" &&
                    screenResolution !== "null"
                        ? {
                              screenResolution: {
                                  [Op.iLike]: `%${screenResolution}%`,
                              },
                          }
                        : undefined,
                    mainCameraResolution !== undefined &&
                    mainCameraResolution !== "" &&
                    mainCameraResolution !== "null"
                        ? {
                              mainCameraResolution: {
                                  [Op.iLike]: `%${mainCameraResolution}%`,
                              },
                          }
                        : undefined,
                    frontCameraResolution !== undefined &&
                    frontCameraResolution !== "" &&
                    frontCameraResolution !== "null"
                        ? {
                              frontCameraResolution: {
                                  [Op.iLike]: `%${frontCameraResolution}%`,
                              },
                          }
                        : undefined,
                    batteryCapacity !== undefined &&
                    batteryCapacity !== "" &&
                    batteryCapacity !== "null"
                        ? {
                              batteryCapacity: {
                                  [Op.iLike]: `%${batteryCapacity}%`,
                              },
                          }
                        : undefined,
                    operatingSystem !== undefined &&
                    operatingSystem !== "" &&
                    operatingSystem !== "null"
                        ? {
                              operatingSystem: {
                                  [Op.iLike]: `%${operatingSystem}%`,
                              },
                          }
                        : undefined,
                ].filter(Boolean),
            };

            let dataPhone;

            if (whereClause[Op.or].length === 0) {
                dataPhone = await Phone.findAll({
                    include: [
                        {
                            model: User,
                            attributes: ["name"],
                            as: "Creator",
                        },
                    ],
                    limit: 10,
                });
            } else {
                dataPhone = await Phone.findAll({
                    where: whereClause,
                    include: [
                        {
                            model: User,
                            attributes: ["name"],
                            as: "Creator",
                        },
                    ],
                    limit: 10,
                });
            }

            res.json({ phone: dataPhone });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = Controller;
