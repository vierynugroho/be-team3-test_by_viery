const login = require("./users/login-validator");
const register = require("./users/create_user-validator.js");
const updateUser = require("./users/update_user-validator.js");

module.exports = {
    login,
    register,
    updateUser,
};
