const express = require("express");

const router = express.Router();

const upload = require("../middlewares/upload-middleware");
const validatorMiddleware = require("../middlewares/validator-middleware");
const { register } = require("../controllers/auth/register-controller");
const { login } = require("../controllers/auth/login-controller");

router.post(
    "/register",
    upload.array("images"),
    validatorMiddleware("register"),
    register
);

router.post("/login", validatorMiddleware("login"), login);

module.exports = router;
