"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var role_1 = require("./../middlewares/role");
var jwt_1 = require("./../middlewares/jwt");
var ProductController_1 = require("./../controller/ProductController");
var express_1 = require("express");
var router = express_1.Router();
// Get all product
router.get('/', [jwt_1.checkJwt], ProductController_1.ProductController.getAllProducts);
// Get one product
router.get('/:Id', [jwt_1.checkJwt, role_1.checkRole(['Admin'])], ProductController_1.ProductController.getById);
// Create a new product
//router.post('/',[checkJwt, checkRole(['Admin'])], UserController.new);
// Edit product
router.patch('/:Id', [jwt_1.checkJwt, role_1.checkRole(['Admin'])], ProductController_1.ProductController.edit);
// Delete
//router.delete('/:id', [checkJwt, checkRole(['Admin'])], UserController.delete);
exports.default = router;
//# sourceMappingURL=prod.js.map