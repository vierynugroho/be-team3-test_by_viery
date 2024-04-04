const { User } = require('../databases/models');
const { randomUUID } = require('crypto');
const handleUploadImage = require('../utils/handle_upload');
const imageKit = require('../libs/imageKit');

const getUsers = async (req, res) => {
	try {
		const users = await User.findAll();

		res.status(200).json({
			status: true,
			data: users,
			message: 'User',
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
		if (!user) throw new Error('User Not Found!');

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
			message: 'create user successfully!',
			data: user,
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
};
