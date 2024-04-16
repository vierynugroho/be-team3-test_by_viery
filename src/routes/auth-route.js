const express = require("express");

const router = express.Router();

const { register } = require("../controllers/auth/register-controller");
const { login, userLoggedIn } = require("../controllers/auth/login-controller");
const upload = require("../middlewares/upload-middleware");
const validatorMiddleware = require("../middlewares/validator-middleware");
const Authenticate = require("../middlewares/auth-middleware");
const CheckRole = require("../middlewares/role-middleware");
const {
    registerSchema,
    loginSchema,
    updateUserSchema,
} = require("../utils/joiValidation");
const { updateUser, deleteUser } = require("../controllers/user-controller");

//! Register
//TODO: superadmin
router.post(
    "/sudo/register",
    Authenticate,
    CheckRole(["superadmin"]),
    upload.array("images"),
    validatorMiddleware(registerSchema),
    register
);
//TODO: admin
router.post(
    "/register",
    Authenticate,
    CheckRole(["admin", "superadmin"]),
    upload.array("images"),
    validatorMiddleware(registerSchema),
    register
);

//TODO: user
router.put(
    "/profile",
    Authenticate,
    upload.array("images"),
    validatorMiddleware(updateUserSchema),
    updateUser
);

router.delete("/profile", Authenticate, deleteUser);

router.get("/me", Authenticate, userLoggedIn);
router.post("/login", validatorMiddleware(loginSchema), login);

module.exports = router;
