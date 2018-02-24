import express from 'express';
import routes from './all-routes';
import handlers from '../controllers';

const apiRoute = new express.Router();

for (const route of routes) {
  const method = route.method.toLowerCase();
  const handler = handlers[route.handler];
  const before = route.beforeRouteMiddleware || [];
  const after = route.afterRouteMiddleware || [];
  if ((handler && Object.prototype.toString.call(handler) === '[object Function]') || Array.isArray(handler)) {
    apiRoute[method](route.url, before, handler, after);
  }
}

export default apiRoute;
