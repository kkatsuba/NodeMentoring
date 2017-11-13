'use strict';

const products = require('../data/csv-reader')('MOCK_PRODUCTS.csv') || [];

module.exports = {
    up: (queryInterface, Sequelize) => {
        // I could remove id from products and then insert
        // but this step can break something in real life, if John Doe somewhere using product ids.
        // so if used insert with ids currval('seq') will not change. to change it need execute setval.
        let seqEnd = 0;
        products.forEach(product => {
            if (parseInt(product.id) >= seqEnd) seqEnd = product.id;
        });

        queryInterface.sequelize.query(`SELECT setval('products_id_seq', ${++seqEnd}, true)`).then(() => {
            console.log('products_id_seq currval', seqEnd);
        }).catch(err => {
            console.log(err);
        });

        return queryInterface.bulkInsert('products', products, {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('products', null, {});
    }
};
