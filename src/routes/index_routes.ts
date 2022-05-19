import { Router } from 'express';
import usersRoutes from './api/user_routes';
import ordersRoutes from './api/order_routes';
import productsRoutes from './api/product_routes';
import productOrderRoutes from './api/order_products_routes';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/orders', ordersRoutes);
routes.use('/products', productsRoutes);
routes.use('/order_products', productOrderRoutes);
export default routes;
