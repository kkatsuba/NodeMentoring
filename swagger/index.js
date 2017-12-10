const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  info: {
    title: 'Node Mentoring API',
    version: '1.0.0'
  },
  host: 'localhost:8081',
  basePath: '/'
};

const options = {
  swaggerDefinition,
  apis: [
    './routes/**/*.js',
    './swagger/**/*.yaml'
  ]
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
