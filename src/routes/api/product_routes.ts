import { Router, Response, Request } from 'express';
import * as handlers from '../../handlers/product_handler';
import validateTokenMiddleware from '../../middlewares/authenticationmiddleware';
const routes = Router();

routes.post('/', validateTokenMiddleware, handlers.create);
routes.get('/', handlers.index);
routes.get('/:id', handlers.show);
routes.delete('/:id', validateTokenMiddleware, handlers.destroy);
routes.put('/:id', validateTokenMiddleware, handlers.update);
//routes.route('/authentication').post(handlers.authentication);
export default routes;
