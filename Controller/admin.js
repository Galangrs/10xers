const bcrypt = require("bcrypt");
const { User, Phone } = require("../models/");
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
                admin: true,
            });
            res.status(201).json({
                message: `Account ${username} created successfully`,
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = Controller;
