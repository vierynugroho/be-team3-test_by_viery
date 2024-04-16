"use strict";
const { randomUUID } = require("crypto");
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        //! COMPANIES
        const companyData = [];

        for (let i = 1; i <= 3; i++) {
            companyData.push({
                id: randomUUID(),
                name: `Plaza 0${i} Corp.`,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        }

        const companies = await queryInterface.bulkInsert(
            "Companies",
            companyData,
            {
                returning: true,
            }
        );

        //! USER & AUTH

        const password = "password";
        const confirmPassword = password;

        const saltRounds = 10;
        const hashedPassword = bcrypt.hashSync(password, saltRounds);
        const hashedConfirmPassword = bcrypt.hashSync(
            confirmPassword,
            saltRounds
        );

        const randomRoles = ["superadmin", "admin", "user"];

        const users_data = companies.map((company) => {
            randomRoles.forEach((role) => ({
                id: randomUUID(),
                companyId: company.id,
                name: role,
                role: role,
                imageUrl: "{}",
                imageId: "{}",
                createdAt: new Date(),
                updatedAt: new Date(),
            }));
        });

        const users = await queryInterface.bulkInsert("Users", users_data, {
            returning: true,
        });

        const auth_data = users.map((user) => {
            return {
                id: randomUUID(),
                userId: user.id,
                email: `${user.name}@mail.com`,
                password: hashedPassword,
                confirmPassword: hashedConfirmPassword,
                createdAt: new Date(),
                updatedAt: new Date(),
            };
        });

        return queryInterface.bulkInsert("Auths", auth_data);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Companies", null, { returning: true });
        await queryInterface.bulkDelete("Users", null, { returning: true });
        await queryInterface.bulkDelete("Auths", null, { returning: true });
    },
};
