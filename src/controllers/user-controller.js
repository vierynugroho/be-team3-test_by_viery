const bcrypt = require("bcrypt");
const createHttpError = require("http-errors");
const handleUploadImage = require("../utils/handle_upload");
const imageKit = require("../libs/imageKit");
const { User, Auth } = require("../databases/models");
const { Op, Sequelize } = require("sequelize");

const getUsers = async (req, res) => {
    try {
        const search = req.query.search || "";
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const { count, rows } = await User.findAndCountAll({
            where: {
                name: {
                    [Op.iLike]: `%${search}%`,
                },
            },
            order: [[Sequelize.col("role"), "ASC"]],
            offset,
            limit,
        });

        res.status(200).json({
            status: true,
            message: "get all user data success",
            pagination: {
                totalItems: count,
                totalPages: Math.ceil(count / limit),
                currentPage: +page,
                pageItems: rows.length,
                nextPage: page < Math.ceil(count / limit) ? page + 1 : null,
                prevPage: page > 1 ? page - 1 : null,
            },
            data: rows,
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message,
        });
    }
};

const getUser = async (req, res, next) => {
    try {
        const id = req.params.id;

        const user = await User.findOne({
            where: {
                id,
            },
            include: ["Auth"],
        });

        if (user === null) {
            next(
                createHttpError(404, {
                    message: "User Not Found",
                })
            );
            return;
        }

        res.status(200).json({
            status: true,
            data: user,
        });
    } catch (error) {
        next(createHttpError(500, { message: error.message }));
    }
};

//! ERROR
const updateUser = async (req, res, next) => {
    try {
        const { email, password, confirmPassword, name, role } = req.body;
        const files = req.files;

        const email_userLoggedIn = req.user.Auth.email;
        const authId_UserLoggedIn = req.user.Auth.id;
        const userId_UserLoggedIn = req.user.id;

        //! validation unique field

        const auths = await Auth.findAll();
        const authUserLoggedIn = await Auth.findByPk(authId_UserLoggedIn);
        let usersEmail = [];

        auths.map((user) => {
            usersEmail.push(user.email);
        });

        if (usersEmail.includes(email)) {
            if (email !== authUserLoggedIn.email) {
                return next(
                    createHttpError(400, {
                        message: "Email has been used",
                    })
                );
            } else {
                delete email;
            }
        }

        const userExist = await User.findOne({
            where: {
                id: userId_UserLoggedIn,
            },
            include: ["Auth"],
        });

        if (!userExist) {
            return next(createHttpError(404, { message: "User not found" }));
        }

        const images = {
            imagesUrl: userExist.imageUrl,
            imagesId: userExist.imageId,
        };

        // hashing password
        const saltRounds = 10;
        const hashedPassword = bcrypt.hashSync(password, saltRounds);
        const hashedConfirmPassword = bcrypt.hashSync(
            confirmPassword,
            saltRounds
        );

        if (files.length !== 0) {
            const { imagesUrl, imagesId } = await handleUploadImage(files);
            images.imagesUrl = imagesUrl;
            images.imagesId = imagesId;
        }

        const userUpdated = await User.update(
            {
                name,
                companyId: req.user.companyId,
                role,
                imageUrl: images.imagesUrl,
                imageId: images.imagesId,
            },
            {
                where: {
                    id: userId_UserLoggedIn,
                },
            }
        );
        const authUpdated = await Auth.update(
            {
                email,
                password: hashedPassword,
                confirmPassword: hashedConfirmPassword,
            },
            {
                where: {
                    id: authId_UserLoggedIn,
                },
            }
        );

        res.status(201).json({
            status: true,
            message: "update user successfully!",
            data: {
                user: {
                    ...userUpdated,
                },
                auth: {
                    ...authUpdated,
                },
            },
        });
    } catch (error) {
        next(createHttpError(500, { message: error.message }));
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await User.findByPk(id);

        if (!user) {
            next(createHttpError(404, { message: error.message }));
        }

        if (user.imageUrl.length !== 0 || user.imageId.length !== 0) {
            await imageKit.deleteFile(user.imageId[0]);
        }

        await User.destroy({
            where: {
                id,
            },
        });

        res.status(200).json({
            status: true,
            message: "delete user successfully!",
        });
    } catch (error) {
        next(createHttpError(500, { message: error.message }));
    }
};

module.exports = {
    getUsers,
    getUser,
    updateUser,
    deleteUser,
};
