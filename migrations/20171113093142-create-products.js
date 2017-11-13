'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('products', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            brand: {
                type: Sequelize.STRING,
                allowNull: false
            },
            company: {
                type: Sequelize.STRING
            },
            price: {
                type: Sequelize.STRING,
                allowNull: false
            },
            isbn: {
                type: Sequelize.STRING,
                allowNull: false
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('products');
    }
};