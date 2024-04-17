const router = require("express").Router();

const user_router = require("./user-route");
const auth_router = require("./auth-route");
const item_router = require("./item-route");

router.use("/api/v1/", auth_router);
router.use("/api/v1/users", user_router);
router.use("/api/v1/items", item_router);

module.exports = router;
