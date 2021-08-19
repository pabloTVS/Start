import { checkJwt } from './../middlewares/jwt';
import { LinesOrdersController } from './../controller/LinesOrdersController';
import { Router } from 'express';

const router = Router();

// Get all product and lines.
router.get('/:NumPedido',[checkJwt], LinesOrdersController.getLinOrder);
// Create a new line

// Delete line

export default router;