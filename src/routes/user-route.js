const express = require('express');

const router = express.Router();

const { getUsers, getUser, createUser } = require('../controllers/user-controller');
const upload = require('../middlewares/upload-middleware');
const validatorMiddleware = require('../middlewares/validator-middleware');

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', upload.array('images'), validatorMiddleware('createUser'), createUser);

module.exports = router;
