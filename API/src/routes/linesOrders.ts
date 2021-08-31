import { checkJwt } from './../middlewares/jwt';
import { LinesOrdersController } from './../controller/LinesOrdersController';
import { Router } from 'express';

const router = Router();

// Get all product and lines.
router.get('/:NumPedido',[checkJwt], LinesOrdersController.getLinOrder);
// Create a new line
router.post('/',[checkJwt],LinesOrdersController.new);
// Delete line
router.delete('/:IdLinPed/:NumPedido',[checkJwt],LinesOrdersController.delete);

export default router;