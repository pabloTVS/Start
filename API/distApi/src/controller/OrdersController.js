"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersController = void 0;
var typeorm_1 = require("typeorm");
var class_validator_1 = require("class-validator");
var orders_1 = require("../entity/orders");
var viewOrders_1 = require("../entity/viewOrders");
var OrdersController = /** @class */ (function () {
    function OrdersController() {
    }
    //obtiene las cabeceras.
    OrdersController.getAllOrders = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, CodComercial, CodCli, Role, ordersRepository, orders, e_1, e_2, e_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.params, CodComercial = _a.CodComercial, CodCli = _a.CodCli, Role = _a.Role;
                    ordersRepository = typeorm_1.getRepository(viewOrders_1.vieworders);
                    if (!(Role === 'Admin')) return [3 /*break*/, 5];
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, ordersRepository.createQueryBuilder().
                            select(["ord.NumPed", "ord.Serie", "ord.Fecha", "case when ord.estado = 1 then '' else ord.FechaEntrega end FechaEntrega", "ord.CodComercial", "ord.Comercial", "ord.CodCli", "ord.NombreCliente", "ord.DenominacionComercial", "ord.Destino", "ord.Direccion",
                            "ord.Localidad", "ord.CodPostal", "ord.Provincia", "ord.Total", "ord.Pagado", "ord.Pendiente", "ord.CodFormaPago", "ord.DescripcionFormaPago", "ord.CodigoEstado", "ord.Estado",
                            "ord.PorcComision", "ord.SerieFra", "ord.NumFra", "ord.FechaFra", "ord.CodDestino", "ord.DtoPP", "ord.Observaciones"]).
                            from(viewOrders_1.vieworders, "ord").where("ord.NumPed != 0").orderBy("ord.Fecha", "DESC").getMany()];
                case 2:
                    orders = _b.sent();
                    //              orders = await ordersRepository.find();
                    res.send(orders);
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _b.sent();
                    res.status(404).json({ message: e_1.message });
                    return [3 /*break*/, 4];
                case 4: return [3 /*break*/, 14];
                case 5:
                    if (!(Role === 'Comercial')) return [3 /*break*/, 10];
                    _b.label = 6;
                case 6:
                    _b.trys.push([6, 8, , 9]);
                    return [4 /*yield*/, ordersRepository.createQueryBuilder().
                            select(["ord.NumPed", "ord.Serie", "ord.Fecha", "ord.FechaEntrega", "ord.CodComercial", "ord.Comercial", "ord.CodCli", "ord.NombreCliente", "ord.DenominacionComercial", "ord.Destino", "ord.Direccion",
                            "ord.Localidad", "ord.CodPostal", "ord.Provincia", "ord.Total", "ord.Pagado", "ord.Pendiente", "ord.CodFormaPago", "ord.DescripcionFormaPago", "ord.CodigoEstado", "ord.Estado",
                            "ord.PorcComision", "ord.SerieFra", "ord.NumFra", "ord.FechaFra", "ord.CodDestino", "ord.DtoPP", "ord.Observaciones"]).
                            from(viewOrders_1.vieworders, "ord").where("ord.CodComercial =:com ", { com: CodComercial }).getMany()];
                case 7:
                    orders = _b.sent();
                    orders ? res.send(orders) : res.status(404).json({ message: 'No se ha devuelto ningún valor.' });
                    return [3 /*break*/, 9];
                case 8:
                    e_2 = _b.sent();
                    res.status(400).json({ message: e_2.message });
                    return [3 /*break*/, 9];
                case 9: return [3 /*break*/, 14];
                case 10:
                    if (!(Role === 'Suscriptor')) return [3 /*break*/, 14];
                    _b.label = 11;
                case 11:
                    _b.trys.push([11, 13, , 14]);
                    return [4 /*yield*/, ordersRepository.createQueryBuilder().
                            select(["ord.NumPed", "ord.Serie", "ord.Fecha", "ord.FechaEntrega", "ord.CodComercial", "ord.Comercial", "ord.CodCli", "ord.NombreCliente", "ord.DenominacionComercial", "ord.Destino", "ord.Direccion",
                            "ord.Localidad", "ord.CodPostal", "ord.Provincia", "ord.Total", "ord.Pagado", "ord.Pendiente", "ord.CodFormaPago", "ord.DescripcionFormaPago", "ord.CodigoEstado", "ord.Estado",
                            "ord.PorcComision", "ord.SerieFra", "ord.NumFra", "ord.FechaFra", "ord.CodDestino", "ord.DtoPP", "ord.Observaciones"]).
                            from(viewOrders_1.vieworders, "ord").where("ord.CodCli =:cli ", { cli: CodCli }).getMany()];
                case 12:
                    orders = _b.sent();
                    orders ? res.send(orders) : res.status(404).json({ message: 'No se ha devuelto ningún valor.' });
                    return [3 /*break*/, 14];
                case 13:
                    e_3 = _b.sent();
                    res.status(400).json({ message: e_3.message });
                    return [3 /*break*/, 14];
                case 14: return [2 /*return*/];
            }
        });
    }); };
    //only order
    OrdersController.getById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var NumPedido, orderRepository, orders, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    NumPedido = req.params.NumPedido;
                    orderRepository = typeorm_1.getRepository(viewOrders_1.vieworders);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, orderRepository.createQueryBuilder().
                            select(["ord.NumPed", "ord.Serie", "ord.Fecha", "ord.FechaEntrega", "ord.CodCli", "ord.DtoPP", "ord.Observaciones", "ord.TotalPedido",
                            "ord.TotalPagado", "ord.TotalPendiente", "ord.NumFra", "ord.SerieFra", "ord.FechaFra", "ord.CodComercial", "ord.Comision", "ord.CodDestino", "ord.CodOrdStatus", "ord.CodFormaPago"]).
                            from(viewOrders_1.vieworders, "ord").where("ord.NumPed =:ped ", { ped: NumPedido }).getMany()];
                case 2:
                    orders = _a.sent();
                    //orders = await orderRepository.findOneOrFail()
                    orders ? res.send(orders) : res.status(404).json({ message: 'No se ha devuelto ningún valor.' });
                    return [3 /*break*/, 4];
                case 3:
                    e_4 = _a.sent();
                    res.status(400).json({ message: e_4.message });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    //New order
    OrdersController.new = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, Serie, Fecha, FechaEntrega, CodCli, DtoPP, Observaciones, CodComercial, Comision, CodDestino, CodOrdStatus, CodFormaPago, order, orderNew, validationOpt, errors, orderRepository, e_5;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, Serie = _a.Serie, Fecha = _a.Fecha, FechaEntrega = _a.FechaEntrega, CodCli = _a.CodCli, DtoPP = _a.DtoPP, Observaciones = _a.Observaciones, CodComercial = _a.CodComercial, Comision = _a.Comision, CodDestino = _a.CodDestino, CodOrdStatus = _a.CodOrdStatus, CodFormaPago = _a.CodFormaPago;
                    order = new orders_1.Orders();
                    order.Serie = Serie;
                    order.Fecha = Fecha;
                    order.FechaEntrega = FechaEntrega;
                    order.CodCli = CodCli;
                    order.DtoPP = DtoPP;
                    order.Observaciones = Observaciones;
                    order.CodComercial = CodComercial;
                    order.Comision = Comision;
                    order.CodDestino = CodDestino;
                    order.CodOrdStatus = CodOrdStatus;
                    order.CodFormaPago = CodFormaPago;
                    validationOpt = { validationError: { target: false, value: false } };
                    return [4 /*yield*/, class_validator_1.validate(order, validationOpt)];
                case 1:
                    errors = _b.sent();
                    if (errors.length > 0) {
                        return [2 /*return*/, res.status(400).json(errors)];
                    }
                    orderRepository = typeorm_1.getRepository(orders_1.Orders);
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, orderRepository.save(order)];
                case 3:
                    orderNew = _b.sent();
                    return [3 /*break*/, 5];
                case 4:
                    e_5 = _b.sent();
                    return [2 /*return*/, res.status(409).json(e_5.message)];
                case 5:
                    res.send(orderNew);
                    return [2 /*return*/];
            }
        });
    }); };
    //Delete order
    OrdersController.delete = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var NumPedido, ordersRepository, order, e_6, e_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    NumPedido = req.params.NumPedido;
                    ordersRepository = typeorm_1.getRepository(orders_1.Orders);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, ordersRepository.findOneOrFail(NumPedido)];
                case 2:
                    order = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_6 = _a.sent();
                    return [2 /*return*/, res.status(404).json({ message: 'Pedido inexistente.' })];
                case 4:
                    _a.trys.push([4, 6, , 7]);
                    return [4 /*yield*/, ordersRepository.delete(NumPedido)];
                case 5:
                    _a.sent();
                    return [3 /*break*/, 7];
                case 6:
                    e_7 = _a.sent();
                    return [2 /*return*/, res.status(409).json(e_7.message)];
                case 7:
                    res.status(201).json({ message: 'Pedido borrado' });
                    return [2 /*return*/];
            }
        });
    }); };
    return OrdersController;
}());
exports.OrdersController = OrdersController;
exports.default = OrdersController;
//# sourceMappingURL=OrdersController.js.map