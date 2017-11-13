'use strict';
module.exports = (sequelize, Sequelize) => {
    return sequelize.define('products', {
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
    }, {
        timestamps: false
    });
};