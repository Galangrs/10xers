"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Phones", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            brand: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            type: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            color: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            price: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            processor: {
                type: Sequelize.STRING,
            },
            ramCapacity: {
                type: Sequelize.INTEGER,
            },
            storageCapacity: {
                type: Sequelize.INTEGER,
            },
            screenSize: {
                type: Sequelize.STRING,
            },
            screenResolution: {
                type: Sequelize.STRING,
            },
            mainCameraResolution: {
                type: Sequelize.STRING,
            },
            frontCameraResolution: {
                type: Sequelize.STRING,
            },
            batteryCapacity: {
                type: Sequelize.INTEGER,
            },
            operatingSystem: {
                type: Sequelize.STRING,
            },
            userId: {
                type: Sequelize.INTEGER,
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
        await queryInterface.dropTable("Phones");
    },
};
