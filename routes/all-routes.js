import cities from './cities';
import users from './users';
import products from './products';

export default [
  {
    method: 'GET',
    url: '/api/help',
    handler: 'apiHelp'
  }, {
    method: 'USE',
    url: '/swagger-ui',
    handler: 'swaggerUI'
  }, {
    method: 'GET',
    url: '/swagger.json',
    handler: 'swaggerJSON'
  },

  ...cities,
  ...users,
  ...products
];

