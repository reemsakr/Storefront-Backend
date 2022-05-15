import { Router,Response,Request } from "express";
import * as handlers from '../../handlers/order_handler';
import validateTokenMiddleware from "../../middlewares/authenticationmiddleware";
const routes=Router();

routes.post('/',validateTokenMiddleware,handlers.create);
routes.get('/',validateTokenMiddleware,handlers.index);
routes.get('/:user_id',validateTokenMiddleware,handlers.show);
routes.delete('/:id',validateTokenMiddleware,handlers.destroy);

export default routes;
