import { Router } from "express";
import usersRoutes from './api/user_routes';
import ordersRoutes from "./api/order_routes";
import productsRoutes from "./api/product_routes";

const routes=Router();

routes.use('/users',usersRoutes);
routes.use('/orders',ordersRoutes);
routes.use('/products',productsRoutes);

export default routes;
