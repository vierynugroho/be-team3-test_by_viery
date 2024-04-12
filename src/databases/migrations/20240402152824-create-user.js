"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Users", {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING,
            },
            companyId: {
                type: Sequelize.STRING,
            },
            name: {
                type: Sequelize.STRING,
            },
            role: {
                type: Sequelize.ENUM("superadmin", "admin", "user"),
                allowNull: false,
            },

            imageUrl: {
                type: Sequelize.ARRAY(Sequelize.TEXT),
            },
            imageId: {
                type: Sequelize.ARRAY(Sequelize.TEXT),
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Users");
    },
};
