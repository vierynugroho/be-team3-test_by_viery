const express = require("express");
const upload = require("../middlewares/upload-middleware");
const validatorMiddleware = require("../middlewares/validator-middleware");
const {
    getUsers,
    getUser,
    updateUser,
    deleteUser,
} = require("../controllers/user-controller");

const { updateUserSchema } = require("../utils/joiValidation");

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUser);
router.put(
    "/:id",
    upload.array("images"),
    validatorMiddleware(updateUserSchema),
    updateUser
);
router.delete("/:id", deleteUser);

module.exports = router;
