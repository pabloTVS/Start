import { checkRole } from './../middlewares/role';
import { checkJwt } from './../middlewares/jwt';
import { OrdersController } from './../controller/OrdersController';
import { Router } from 'express';

const router = Router();

// Get all product and lines.
router.get('/:CodComercial/:Role',[checkJwt], OrdersController.getAllOrders);
// Get one order
router.get('/:NumPedido',[checkJwt], OrdersController.getById);


// Create a new orders
router.post('/',[checkJwt], OrdersController.new);

// Edit order
//router.patch('/:IdCliente', [checkJwt, checkRole(['Admin'])], CustomerController.edit);

// Delete order
router.delete('/:NumPedido', [checkJwt], OrdersController.delete);

export default router;