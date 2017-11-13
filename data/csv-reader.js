const fs = require('fs');
const path = require('path');
const papa = require('papaparse');

module.exports = (fileName) => {
    const productsData = fs.readFileSync(path.join(__dirname, '..', 'data', fileName), 'utf-8');
    return papa.parse(productsData, { header: true }).data;
};