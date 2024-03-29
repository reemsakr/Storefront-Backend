import { Router, Response, Request } from 'express';
import * as handlers from '../../handlers/user_handler';
import validateTokenMiddleware from '../../middlewares/authenticationmiddleware';
const routes = Router();

routes.post('/',handlers.create);
routes.get('/', validateTokenMiddleware, handlers.index);
routes.get('/:id', validateTokenMiddleware, handlers.show);
routes.delete('/:id', validateTokenMiddleware, handlers.destroy);
routes.put('/:id', validateTokenMiddleware, handlers.update);
routes.route('/authentication').post(handlers.authentication);

export default routes;
