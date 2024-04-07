const { User } = require("../databases/models");
const { randomUUID } = require("crypto");
const handleUploadImage = require("../utils/handle_upload");
const imageKit = require("../libs/imageKit");
const { where } = require("sequelize");

const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();

        res.status(200).json({
            status: true,
            data: users,
            message: "User",
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message,
        });
    }
};

const getUser = async (req, res) => {
    try {
        const id = req.params.id;

        const user = await User.findByPk(id);
        if (!user) throw new Error("User Not Found!");

        res.status(200).json({
            status: true,
            data: user,
        });
    } catch (error) {
        res.status(404).json({
            status: false,
            message: error.message,
        });
    }
};

const createUser = async (req, res) => {
    try {
        const { name, companyId, role } = req.body;
        const files = req.files;

        const images = {
            imagesUrl: [],
            imagesId: [],
        };

        if (files) {
            const { imagesUrl, imagesId } = await handleUploadImage(files);

            images.imagesUrl = imagesUrl;
            images.imagesId = imagesId;
        }

        const user = await User.create({
            id: randomUUID(),
            name,
            companyId,
            role,
            imageUrl: images.imagesUrl,
            imageId: images.imagesId,
        });

        res.status(201).json({
            status: true,
            message: "create user successfully!",
            data: user,
        });
    } catch (error) {
        res.status(400).json({
            status: false,
            message: error.message,
        });
    }
};

const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findByPk(id);

        if (!user) {
            throw Error("User Not Found!");
        }

        const { name, companyId, role } = req.body;
        const files = req.files;

        const images = {
            imagesUrl: [],
            imagesId: [],
        };

        if (files.length !== 0) {
            await imageKit.deleteFile(user.imageId[0]);

            const { imagesUrl, imagesId } = await handleUploadImage(files);

            images.imagesUrl = imagesUrl;
            images.imagesId = imagesId;
        } else {
            images.imagesUrl = user.imageUrl;
            images.imagesId = user.imageId;
        }

        await User.update(
            {
                name,
                companyId,
                role,
                imageUrl: images.imagesUrl,
                imageId: images.imagesId,
            },
            {
                where: {
                    id,
                },
            }
        );

        res.status(200).json({
            status: true,
            message: "update user successfully!",
            data: {
                name,
                companyId,
                role,
                imageUrl: images.imagesUrl,
                imageId: images.imagesId,
            },
        });
    } catch (error) {
        res.status(400).json({
            status: false,
            message: error.message,
        });
    }
};
const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findByPk(id);

        if (!user) {
            throw Error("Car Not Found!");
        }

        if (user.imageUrl != "" || user.imageId != "") {
            await imageKit.deleteFile(user.image_id[0]);
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
        res.status(400).json({
            status: false,
            message: error.message,
        });
    }
};

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
};
