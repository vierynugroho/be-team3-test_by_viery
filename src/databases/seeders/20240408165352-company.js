"use strict";
const { randomUUID } = require("crypto");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const companyData = [];

        const allowedNumbers = [2, 4, 6];

        for (let i = 1; i <= 5; i++) {
            const randomIndex = Math.floor(
                Math.random() * allowedNumbers.length
            );

            companyData.push({
                id: randomUUID(),
                name: `Plaza 0${i} Corp.`,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        }

        return queryInterface.bulkInsert("Companies", companyData);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete("Companies", null, {});
    },
};
