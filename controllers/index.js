import citiesRoutes from './cities';
import usersRoutes from './users';
import productsRoutes from './products';
import helpRoutes from './help';

export default {
  ...citiesRoutes,
  ...usersRoutes,
  ...productsRoutes,
  ...helpRoutes
};
