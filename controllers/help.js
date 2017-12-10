import routes from '../routes/all-routes';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../swagger/index';

const apiHelp = (req, res) => {
  res.json(routes.map(route => ({
    method: route.method,
    url: route.url
  })));
};

const swaggerUI = [swaggerUi.serve, swaggerUi.setup(swaggerSpec)];
const swaggerJSON = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
};

export default {
  apiHelp,
  swaggerUI,
  swaggerJSON
};
