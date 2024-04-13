//! ----- login ------
// TODO:
// login handler with JWT
require("dotenv/config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createHttpError = require("http-errors");
const { Auth } = require("../../databases/models");

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await Auth.findOne({
            where: {
                email,
            },
            include: ["User"],
        });

        if (user && bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign(
                {
                    id: user.userId,
                    username: user.User.name,
                    role: user.User.role,
                    email: user.email,
                    companyId: user.User.companyId,
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: process.env.JWT_EXP,
                }
            );

            res.status(200).json({
                status: true,
                message: "Login Success",
                _token: token,
            });
        } else {
            next(
                createHttpError(400, {
                    message: "Wrong Password or user not found",
                })
            );
        }
    } catch (error) {
        next(createHttpError(500, { message: error.message }));
    }
};

const userLoggedIn = async (req, res, next) => {
    try {
        const user = req.user;

        if (!user)
            return next(createHttpError(401, { message: "Unauthorized" }));

        res.status(200).json({
            status: true,
            data: {
                user: {
                    id: user.id,
                    name: user.name,
                    companyId: user.companyId,
                    imageUrl: user.imageUrl,
                    imageId: user.imageId,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
                },
                auth: {
                    id: user.Auth.id,
                    userId: user.Auth.userId,
                    email: user.Auth.email,
                    password: user.Auth.password,
                    id: user.Auth.id,
                    createdAt: user.Auth.createdAt,
                    updatedAt: user.Auth.updatedAt,
                },
            },
        });
    } catch (err) {
        next(createHttpError(500, { message: err.message }));
    }
};

module.exports = { login, userLoggedIn };
