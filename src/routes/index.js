const router = require('express').Router();

const user_router = require('./user-route');

router.use('/api/v1/users', user_router);

module.exports = router;
