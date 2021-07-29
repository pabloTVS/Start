"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customers = void 0;
var typeorm_1 = require("typeorm");
var Customers = /** @class */ (function () {
    function Customers() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Customers.prototype, "IdCliente", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Customers.prototype, "Nombre", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Customers.prototype, "NombreComercial", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", Date)
    ], Customers.prototype, "FechaAlta", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Customers.prototype, "DNINIF", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Customers.prototype, "Telefono1", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Customers.prototype, "Email1", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Customers.prototype, "Email2", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Customers.prototype, "Email3", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Customers.prototype, "Fax1", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Customers.prototype, "Movil1", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Customers.prototype, "CodFormaPago", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Customers.prototype, "RE", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Customers.prototype, "DtoPP", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Customers.prototype, "DtoComercial", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Customers.prototype, "CodPostal", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Customers.prototype, "Localidad", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Customers.prototype, "Provincia", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Customers.prototype, "Direccion", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Customers.prototype, "Entidad", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Customers.prototype, "Oficina", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Customers.prototype, "DC", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Customers.prototype, "Cuenta", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Customers.prototype, "IBAN", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Customers.prototype, "BICSWIFT", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Customers.prototype, "Observaciones", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Customers.prototype, "CodComercial", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Customers.prototype, "EstadoCliente", void 0);
    Customers = __decorate([
        typeorm_1.Entity(),
        typeorm_1.Unique(['IdCliente'])
    ], Customers);
    return Customers;
}());
exports.Customers = Customers;
//# sourceMappingURL=Customers.js.map