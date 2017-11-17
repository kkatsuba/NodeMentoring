import {
  insertModelMiddleware,
  getByIdMiddleware,
  checkIdMiddleware,
  deleteModelMiddleware
} from '../../middlewares/model-middlewares';

export default [
  {
    method: 'GET',
    url: '/api/help',
    handler: 'apiHelp'
  },

  // Cities requests
  {
    method: 'GET',
    url: '/api/city/random',
    handler: 'getRandomCity'
  }, {
    method: 'GET',
    url: '/api/city/:id',
    handler: 'getCityById',
    beforeRouteMiddleware: [ checkIdMiddleware ],
    afterRouteMiddleware: [ getByIdMiddleware ]
  }, {
    method: 'POST',
    url: '/api/city',
    handler: 'saveNewCity',
    afterRouteMiddleware: [ insertModelMiddleware ]
  }, {
    method: 'PUT',
    url: '/api/city/:id',
    handler: 'updateCityById',
    beforeRouteMiddleware: [ checkIdMiddleware ],
  }, {
    method: 'DELETE',
    url: '/api/city/:id',
    handler: 'deleteCityById',
    beforeRouteMiddleware: [ checkIdMiddleware ],
    afterRouteMiddleware: [ deleteModelMiddleware ]
  },

  // Users requests
  {
    method: 'GET',
    url: '/api/user/:id',
    handler: 'getUserById',
    beforeRouteMiddleware: [ checkIdMiddleware ],
    afterRouteMiddleware: [ getByIdMiddleware ]
  }, {
    method: 'POST',
    url: '/api/user',
    handler: 'saveNewUser',
    afterRouteMiddleware: [ insertModelMiddleware ]
  }, {
    method: 'DELETE',
    url: '/api/user/:id',
    handler: 'deleteUserById',
    beforeRouteMiddleware: [ checkIdMiddleware ],
    afterRouteMiddleware: [ deleteModelMiddleware ]
  },

  // Products requests
  {
    method: 'GET',
    url: '/api/products/',
    handler: 'getAllProducts'
  }, {
    method: 'GET',
    url: '/api/products/:id',
    handler: 'getProductById',
    beforeRouteMiddleware: [ checkIdMiddleware ],
    afterRouteMiddleware: [ getByIdMiddleware ]
  }, {
    method: 'POST',
    url: '/api/products',
    handler: 'saveNewProduct',
    afterRouteMiddleware: [ insertModelMiddleware ]
  }, {
    method: 'DELETE',
    url: '/api/products/:id',
    handler: 'deleteProductById',
    beforeRouteMiddleware: [ checkIdMiddleware ],
    afterRouteMiddleware: [ deleteModelMiddleware ]
  }
];

