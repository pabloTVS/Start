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
exports.LinesOrdersController = void 0;
var typeorm_1 = require("typeorm");
var linOrders_1 = require("../entity/linOrders");
var viewLinesOrders_1 = require("../entity/viewLinesOrders");
var class_validator_1 = require("class-validator");
var LinesOrdersController = /** @class */ (function () {
    function LinesOrdersController() {
    }
    LinesOrdersController.getLinOrder = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var NumPedido, linOrderRepository, linOrder, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    NumPedido = req.params.NumPedido;
                    linOrderRepository = typeorm_1.getRepository(linOrders_1.linorders);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, linOrderRepository.createQueryBuilder().
                            select(["lin.IdLinPed", "lin.NumPed", "lin.CodArticulo", "lin.PCosto", "lin.Descripcion", "lin.Cantidad", "lin.Precio",
                            "lin.DtoPP", "lin.SubTotal", "lin.DtoC", "lin.importeDtoC", "lin.BaseImponible", "lin.IVA", "lin.ImporteIVA", "lin.RE", "lin.ImporteRE",
                            "lin.Total", "lin.CodOferta", "lin.LinOferta", "lin.Imagen"]).
                            from(viewLinesOrders_1.viewlinesorders, "lin").where("lin.NumPed =:ped ", { ped: NumPedido }).orderBy("lin.CodArticulo,lin.Descripcion").getMany()];
                case 2:
                    linOrder = _a.sent();
                    linOrder ? res.send(linOrder) : res.status(404).json({ message: 'No se ha devuelto ningún valor.' });
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    res.status(404).json({ message: e_1.message });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    //new line
    LinesOrdersController.new = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, NumPed, CodArticulo, PCosto, Descripcion, Cantidad, Precio, DtoC, DtoPP, PorcIVA, RE, CodOferta, LinOferta, line, newLine, validationOpt, errors, linorderRepository, e_2, e_3, e_4;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, NumPed = _a.NumPed, CodArticulo = _a.CodArticulo, PCosto = _a.PCosto, Descripcion = _a.Descripcion, Cantidad = _a.Cantidad, Precio = _a.Precio, DtoC = _a.DtoC, DtoPP = _a.DtoPP, PorcIVA = _a.PorcIVA, RE = _a.RE, CodOferta = _a.CodOferta, LinOferta = _a.LinOferta;
                    line = new linOrders_1.linorders;
                    line.NumPed = NumPed;
                    line.CodArticulo = CodArticulo;
                    line.PCosto = PCosto;
                    line.Descripcion = Descripcion;
                    line.Cantidad = Cantidad;
                    line.Precio = Precio;
                    line.DtoC = DtoC;
                    line.DtoPP = DtoPP;
                    line.IVA = PorcIVA;
                    line.RE = RE;
                    line.CodOferta = CodOferta;
                    line.LinOferta = LinOferta;
                    validationOpt = { validationError: { target: false, value: false } };
                    return [4 /*yield*/, class_validator_1.validate(linOrders_1.linorders, validationOpt)];
                case 1:
                    errors = _b.sent();
                    if (errors.length > 0) {
                        return [2 /*return*/, res.status(400).json(errors)];
                    }
                    linorderRepository = typeorm_1.getRepository(linOrders_1.linorders);
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, linorderRepository.save(line)];
                case 3:
                    newLine = _b.sent();
                    return [3 /*break*/, 5];
                case 4:
                    e_2 = _b.sent();
                    return [2 /*return*/, res.status(409).json(e_2.message)];
                case 5:
                    _b.trys.push([5, 7, , 8]);
                    return [4 /*yield*/, linorderRepository.query('CALL pa_CalculaLinPed(?, ?)', [line.NumPed, line.IdLinPed])];
                case 6:
                    _b.sent();
                    return [3 /*break*/, 8];
                case 7:
                    e_3 = _b.sent();
                    return [2 /*return*/, res.status(409).json(e_3.message)];
                case 8:
                    _b.trys.push([8, 10, , 11]);
                    return [4 /*yield*/, linorderRepository.query('CALL pa_CalculaPedido (?)', [line.NumPed])];
                case 9:
                    _b.sent();
                    return [3 /*break*/, 11];
                case 10:
                    e_4 = _b.sent();
                    return [2 /*return*/, res.status(409).json(e_4.message)];
                case 11:
                    res.send(newLine);
                    return [2 /*return*/];
            }
        });
    }); };
    LinesOrdersController.delete = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, IdLinPed, NumPedido, linorderRepository, lines, e_5, e_6, e_7;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.params, IdLinPed = _a.IdLinPed, NumPedido = _a.NumPedido;
                    linorderRepository = typeorm_1.getRepository(linOrders_1.linorders);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, linorderRepository.findOneOrFail(IdLinPed)];
                case 2:
                    lines = _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_5 = _b.sent();
                    return [2 /*return*/, res.status(404).json({ message: 'Línea inexistente.' })];
                case 4:
                    _b.trys.push([4, 6, , 7]);
                    return [4 /*yield*/, linorderRepository.delete(IdLinPed)];
                case 5:
                    _b.sent();
                    return [3 /*break*/, 7];
                case 6:
                    e_6 = _b.sent();
                    return [2 /*return*/, res.status(409).json(e_6.message)];
                case 7:
                    _b.trys.push([7, 9, , 10]);
                    return [4 /*yield*/, linorderRepository.query('CALL pa_CalculaPedido (?)', [NumPedido])];
                case 8:
                    _b.sent();
                    return [3 /*break*/, 10];
                case 9:
                    e_7 = _b.sent();
                    return [2 /*return*/, res.status(409).json(e_7.message)];
                case 10:
                    res.status(201).json({ message: 'Línea borrada' });
                    return [2 /*return*/];
            }
        });
    }); };
    return LinesOrdersController;
}());
exports.LinesOrdersController = LinesOrdersController;
exports.default = LinesOrdersController;
//# sourceMappingURL=LinesOrdersController.js.map