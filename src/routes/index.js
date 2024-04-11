const router = require("express").Router();

const user_router = require("./user-route");
const auth_router = require("./auth-route");

router.use("/api/v1/users", user_router);
router.use("/api/v1/register", auth_router);

module.exports = router;
