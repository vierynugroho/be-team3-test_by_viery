//! ----- user handler ------
// TODO:
// get data, update & delete users

const bcrypt = require("bcrypt");
const createHttpError = require("http-errors");
const handleUploadImage = require("../utils/handle_upload");
const imageKit = require("../libs/imageKit");
const { User, Auth } = require("../databases/models");

const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();

        res.status(200).json({
            status: true,
            totalData: users.length,
            data: users,
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

const updateUser = async (req, res, next) => {
    try {
        const { email, password, confirmPassword, name, role } = req.body;
        const files = req.files;

        const userExist = await User.findOne({
            where: {
                id: req.params.id,
            },
            include: ["Auth"],
        });

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
                    id: userExist.id,
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
                    id: userExist.Auth.id,
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
