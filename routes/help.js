import routes from './init/all-routes';

const apiHelp = (req, res) => {
  res.json(routes.map(route => ({
    method: route.method,
    url: route.url
  })));
};

export default {
  apiHelp
};
