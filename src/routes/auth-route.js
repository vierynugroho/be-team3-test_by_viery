const express = require("express");

const router = express.Router();

const upload = require("../middlewares/upload-middleware");
const validatorMiddleware = require("../middlewares/validator-middleware");
const { register } = require("../controllers/auth/register-controller");

router.post(
    "/",
    upload.array("images"),
    validatorMiddleware("register"),
    register
);

module.exports = router;
