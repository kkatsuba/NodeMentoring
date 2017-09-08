const config = require('./config/conf.json');
const { Product, User } = require('./models');

console.log(`Application '${config.name}' running...`);

const prod1 = new Product();
const user1 = new User();
