import { checkRole } from './../middlewares/role';
import { checkJwt } from './../middlewares/jwt';
import { ProductController } from './../controller/ProductController';
import { Router } from 'express';

const router = Router();

// Get all product
router.get('/',[checkJwt], ProductController.getAllProducts);

// Get one product
router.get('/:Id',[checkJwt, checkRole(['Admin'])], ProductController.getById);

// Create a new product
//router.post('/',[checkJwt, checkRole(['Admin'])], UserController.new);

// Edit product
router.patch('/:Id', [checkJwt, checkRole(['Admin'])], ProductController.edit);

// Delete
//router.delete('/:id', [checkJwt, checkRole(['Admin'])], UserController.delete);

export default router;