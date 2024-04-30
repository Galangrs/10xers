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
                admin:false
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
                            admin: userData.admin
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
}

module.exports = Controller;