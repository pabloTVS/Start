"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwt_1 = require("./../middlewares/jwt");
var OrdersController_1 = require("./../controller/OrdersController");
var express_1 = require("express");
var router = express_1.Router();
// Get all product and lines.
router.get('/:CodComercial/:CodCli/:Role', [jwt_1.checkJwt], OrdersController_1.OrdersController.getAllOrders);
// Get one order
router.get('/:NumPedido', [jwt_1.checkJwt], OrdersController_1.OrdersController.getById);
// Create a new orders
router.post('/', [jwt_1.checkJwt], OrdersController_1.OrdersController.new);
// Edit order
//router.patch('/:IdCliente', [checkJwt, checkRole(['Admin'])], CustomerController.edit);
// Delete order
router.delete('/:NumPedido', [jwt_1.checkJwt], OrdersController_1.OrdersController.delete);
exports.default = router;
//# sourceMappingURL=orders.js.map