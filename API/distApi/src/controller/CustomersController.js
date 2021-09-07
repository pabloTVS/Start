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
exports.CustomerController = void 0;
var typeorm_1 = require("typeorm");
var class_validator_1 = require("class-validator");
var Customers_1 = require("../entity/Customers");
var CustomerController = /** @class */ (function () {
    function CustomerController() {
    }
    CustomerController.getAllCustomer = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, CodComercial, Role, customerRepository, customer, e_1, customer, e_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.params, CodComercial = _a.CodComercial, Role = _a.Role;
                    customerRepository = typeorm_1.getRepository(Customers_1.Customers);
                    if (!(Role === 'Admin')) return [3 /*break*/, 5];
                    customer = void 0;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, customerRepository.find()];
                case 2:
                    customer = _b.sent();
                    res.send(customer);
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _b.sent();
                    res.status(404).json({ message: e_1.message });
                    return [3 /*break*/, 4];
                case 4: return [3 /*break*/, 9];
                case 5:
                    customer = void 0;
                    _b.label = 6;
                case 6:
                    _b.trys.push([6, 8, , 9]);
                    return [4 /*yield*/, customerRepository.createQueryBuilder().
                            select(["cust.IdCliente", "cust.Nombre", "cust.NombreComercial", "cust.FechaAlta", "cust.DNINIF", "cust.Telefono1", "cust.Email1", "cust.Email2",
                            "cust.Email3", "cust.Fax1", "cust.Movil1", "cust.CodFormaPago", "cust.RE", "cust.DtoPP", "cust.DtoComercial", "cust.CodPostal", "cust.Localidad",
                            "cust.Provincia", "cust.Direccion", "cust.Entidad", "cust.Oficina", "cust.DC", "cust.Cuenta", "cust.IBAN", "cust.BICSWIFT", "cust.CodComercial", "cust.EstadoCliente"]).
                            from(Customers_1.Customers, "cust").where("cust.CodComercial =:com ", { com: CodComercial }).getMany()];
                case 7:
                    customer = _b.sent();
                    customer ? res.send(customer) : res.status(404).json({ message: 'No se ha devuelto ningún valor.' });
                    return [3 /*break*/, 9];
                case 8:
                    e_2 = _b.sent();
                    res.status(400).json({ message: e_2.message });
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    }); };
    //only customer
    CustomerController.getById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var IdCliente, customerRepository, customer, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    IdCliente = req.params.IdCliente;
                    customerRepository = typeorm_1.getRepository(Customers_1.Customers);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, customerRepository.findOneOrFail(IdCliente)];
                case 2:
                    customer = _a.sent();
                    res.send(customer);
                    return [3 /*break*/, 4];
                case 3:
                    e_3 = _a.sent();
                    res.status(404).json({ message: 'Cliente no encontrado.' });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    //new customer
    CustomerController.new = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, Nombre, NombreComercial, DNINIF, Telefono1, Email1, Email2, Email3, Fax1, Movil1, CodFormaPago, RE, DtoPP, DtoComercial, CodPostal, Localidad, Provincia, Direccion, Entidad, Oficina, DC, Cuenta, IBAN, BICSWIFT, Observaciones, CodComercial, EstadoCliente, customer, validationOpt, errors, customerRepository, e_4;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, Nombre = _a.Nombre, NombreComercial = _a.NombreComercial, DNINIF = _a.DNINIF, Telefono1 = _a.Telefono1, Email1 = _a.Email1, Email2 = _a.Email2, Email3 = _a.Email3, Fax1 = _a.Fax1, Movil1 = _a.Movil1, CodFormaPago = _a.CodFormaPago, RE = _a.RE, DtoPP = _a.DtoPP, DtoComercial = _a.DtoComercial, CodPostal = _a.CodPostal, Localidad = _a.Localidad, Provincia = _a.Provincia, Direccion = _a.Direccion, Entidad = _a.Entidad, Oficina = _a.Oficina, DC = _a.DC, Cuenta = _a.Cuenta, IBAN = _a.IBAN, BICSWIFT = _a.BICSWIFT, Observaciones = _a.Observaciones, CodComercial = _a.CodComercial, EstadoCliente = _a.EstadoCliente;
                    customer = new Customers_1.Customers();
                    customer.Nombre = Nombre;
                    customer.NombreComercial = NombreComercial;
                    customer.DNINIF = DNINIF;
                    customer.Direccion = Direccion;
                    customer.DtoComercial = DtoComercial;
                    customer.DtoPP = DtoPP;
                    customer.Email1 = Email1;
                    customer.Email2 = Email2;
                    customer.Email3 = Email3;
                    customer.Entidad = Entidad;
                    customer.Fax1 = Fax1;
                    customer.IBAN = IBAN;
                    customer.Localidad = Localidad;
                    customer.Movil1 = Movil1;
                    customer.Observaciones = Observaciones;
                    customer.Telefono1 = Telefono1;
                    customer.CodFormaPago = CodFormaPago;
                    customer.RE = RE;
                    customer.CodPostal = CodPostal;
                    customer.Provincia = Provincia;
                    customer.Oficina = Oficina;
                    customer.DC = DC;
                    customer.Cuenta = Cuenta;
                    customer.BICSWIFT = BICSWIFT;
                    customer.CodComercial = CodComercial;
                    customer.EstadoCliente = EstadoCliente;
                    validationOpt = { validationError: { target: false, value: false } };
                    return [4 /*yield*/, class_validator_1.validate(customer, validationOpt)];
                case 1:
                    errors = _b.sent();
                    if (errors.length > 0) {
                        return [2 /*return*/, res.status(400).json(errors)];
                    }
                    customerRepository = typeorm_1.getRepository(Customers_1.Customers);
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, customerRepository.save(customer)];
                case 3:
                    _b.sent();
                    return [3 /*break*/, 5];
                case 4:
                    e_4 = _b.sent();
                    return [2 /*return*/, res.status(409).json(e_4.message)];
                case 5:
                    res.status(201).json({ message: 'Cliente creado correctamente.' });
                    return [2 /*return*/];
            }
        });
    }); };
    //update
    CustomerController.edit = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var IdCliente, _a, Nombre, NombreComercial, DNINIF, Telefono1, Email1, Email2, Email3, Fax1, Movil1, CodFormaPago, RE, DtoPP, DtoComercial, CodPostal, Localidad, Provincia, Direccion, Entidad, Oficina, DC, Cuenta, IBAN, BICSWIFT, Observaciones, CodComercial, EstadoCliente, customerRepository, customer, e_5, validationOpt, errors, e_6;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    IdCliente = req.params.IdCliente;
                    _a = req.body, Nombre = _a.Nombre, NombreComercial = _a.NombreComercial, DNINIF = _a.DNINIF, Telefono1 = _a.Telefono1, Email1 = _a.Email1, Email2 = _a.Email2, Email3 = _a.Email3, Fax1 = _a.Fax1, Movil1 = _a.Movil1, CodFormaPago = _a.CodFormaPago, RE = _a.RE, DtoPP = _a.DtoPP, DtoComercial = _a.DtoComercial, CodPostal = _a.CodPostal, Localidad = _a.Localidad, Provincia = _a.Provincia, Direccion = _a.Direccion, Entidad = _a.Entidad, Oficina = _a.Oficina, DC = _a.DC, Cuenta = _a.Cuenta, IBAN = _a.IBAN, BICSWIFT = _a.BICSWIFT, Observaciones = _a.Observaciones, CodComercial = _a.CodComercial, EstadoCliente = _a.EstadoCliente;
                    customerRepository = typeorm_1.getRepository(Customers_1.Customers);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, customerRepository.findOneOrFail(IdCliente)];
                case 2:
                    customer = _b.sent();
                    customer.Nombre = Nombre;
                    customer.NombreComercial = NombreComercial;
                    customer.DNINIF = DNINIF;
                    customer.Direccion = Direccion;
                    customer.DtoComercial = DtoComercial;
                    customer.DtoPP = DtoPP;
                    customer.Email1 = Email1;
                    customer.Email2 = Email2;
                    customer.Email3 = Email3;
                    customer.Entidad = Entidad;
                    customer.Fax1 = Fax1;
                    customer.IBAN = IBAN;
                    customer.Localidad = Localidad;
                    customer.Movil1 = Movil1;
                    customer.Observaciones = Observaciones;
                    customer.Telefono1 = Telefono1;
                    customer.CodFormaPago = CodFormaPago;
                    customer.RE = RE;
                    customer.CodPostal = CodPostal;
                    customer.Provincia = Provincia;
                    customer.Oficina = Oficina;
                    customer.DC = DC;
                    customer.Cuenta = Cuenta;
                    customer.BICSWIFT = BICSWIFT;
                    customer.CodComercial = CodComercial;
                    customer.EstadoCliente = EstadoCliente;
                    return [3 /*break*/, 4];
                case 3:
                    e_5 = _b.sent();
                    res.status(404).json({ message: 'No se ha devuelto ningún cliente.' });
                    return [3 /*break*/, 4];
                case 4:
                    validationOpt = { validationError: { target: false, value: false } };
                    return [4 /*yield*/, class_validator_1.validate(customer, validationOpt)];
                case 5:
                    errors = _b.sent();
                    if (errors.length > 0) {
                        return [2 /*return*/, res.status(400).json(errors)];
                    }
                    _b.label = 6;
                case 6:
                    _b.trys.push([6, 8, , 9]);
                    return [4 /*yield*/, customerRepository.save(customer)];
                case 7:
                    _b.sent();
                    return [3 /*break*/, 9];
                case 8:
                    e_6 = _b.sent();
                    return [2 /*return*/, res.status(409).json({ message: 'Error guardando cliente.' })];
                case 9:
                    res.status(201).json({ message: 'Cliente guardado correctamente.' });
                    return [2 /*return*/];
            }
        });
    }); };
    CustomerController.delete = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var IdCliente, customerRepository, customer, e_7, e_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    IdCliente = req.params.IdCliente;
                    customerRepository = typeorm_1.getRepository(Customers_1.Customers);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, customerRepository.findOneOrFail(IdCliente)];
                case 2:
                    customer = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_7 = _a.sent();
                    return [2 /*return*/, res.status(404).json({ message: 'Cliente inexistente.' })];
                case 4:
                    _a.trys.push([4, 6, , 7]);
                    return [4 /*yield*/, customerRepository.delete(IdCliente)];
                case 5:
                    _a.sent();
                    return [3 /*break*/, 7];
                case 6:
                    e_8 = _a.sent();
                    return [2 /*return*/, res.status(409).json(e_8.message)];
                case 7:
                    res.status(201).json({ message: ' Cliente borrado' });
                    return [2 /*return*/];
            }
        });
    }); };
    return CustomerController;
}());
exports.CustomerController = CustomerController;
exports.default = CustomerController;
//# sourceMappingURL=CustomersController.js.map