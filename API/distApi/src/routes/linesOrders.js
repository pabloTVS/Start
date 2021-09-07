"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwt_1 = require("./../middlewares/jwt");
var LinesOrdersController_1 = require("./../controller/LinesOrdersController");
var express_1 = require("express");
var router = express_1.Router();
// Get all product and lines.
router.get('/:NumPedido', [jwt_1.checkJwt], LinesOrdersController_1.LinesOrdersController.getLinOrder);
// Create a new line
router.post('/', [jwt_1.checkJwt], LinesOrdersController_1.LinesOrdersController.new);
// Delete line
router.delete('/:IdLinPed/:NumPedido', [jwt_1.checkJwt], LinesOrdersController_1.LinesOrdersController.delete);
exports.default = router;
//# sourceMappingURL=linesOrders.js.map