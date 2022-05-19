import { Router, Response, Request } from 'express';
import * as handlers from '../../handlers/order_products_handler';
import validateTokenMiddleware from '../../middlewares/authenticationmiddleware';
const routes = Router();

routes.post('/', validateTokenMiddleware, handlers.create);
routes.get('/', validateTokenMiddleware, handlers.index);
routes.get('/:id', validateTokenMiddleware, handlers.show);
routes.delete('/:id', validateTokenMiddleware, handlers.destroy);
routes.put('/:id', validateTokenMiddleware, handlers.update);

export default routes;
