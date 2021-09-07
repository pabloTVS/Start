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
exports.vieworders = void 0;
var typeorm_1 = require("typeorm");
var vieworders = /** @class */ (function () {
    function vieworders() {
    }
    __decorate([
        typeorm_1.PrimaryColumn(),
        __metadata("design:type", Number)
    ], vieworders.prototype, "NumPed", void 0);
    __decorate([
        typeorm_1.Column("varchar", { length: 1 }),
        __metadata("design:type", String)
    ], vieworders.prototype, "Serie", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], vieworders.prototype, "Fecha", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], vieworders.prototype, "FechaEntrega", void 0);
    __decorate([
        typeorm_1.Column("int"),
        __metadata("design:type", Number)
    ], vieworders.prototype, "CodComercial", void 0);
    __decorate([
        typeorm_1.Column("varchar"),
        __metadata("design:type", String)
    ], vieworders.prototype, "Comercial", void 0);
    __decorate([
        typeorm_1.Column("int"),
        __metadata("design:type", Number)
    ], vieworders.prototype, "CodCli", void 0);
    __decorate([
        typeorm_1.Column("varchar"),
        __metadata("design:type", String)
    ], vieworders.prototype, "NombreCliente", void 0);
    __decorate([
        typeorm_1.Column("varchar"),
        __metadata("design:type", String)
    ], vieworders.prototype, "DenominacionComercial", void 0);
    __decorate([
        typeorm_1.Column("varchar"),
        __metadata("design:type", String)
    ], vieworders.prototype, "Destino", void 0);
    __decorate([
        typeorm_1.Column("varchar"),
        __metadata("design:type", String)
    ], vieworders.prototype, "Direccion", void 0);
    __decorate([
        typeorm_1.Column("varchar"),
        __metadata("design:type", String)
    ], vieworders.prototype, "Localidad", void 0);
    __decorate([
        typeorm_1.Column("varchar"),
        __metadata("design:type", String)
    ], vieworders.prototype, "CodPostal", void 0);
    __decorate([
        typeorm_1.Column("varchar"),
        __metadata("design:type", String)
    ], vieworders.prototype, "Provincia", void 0);
    __decorate([
        typeorm_1.Column("decimal", { precision: 18.5 }),
        __metadata("design:type", Number)
    ], vieworders.prototype, "Total", void 0);
    __decorate([
        typeorm_1.Column("decimal", { precision: 18.5 }),
        __metadata("design:type", Number)
    ], vieworders.prototype, "Pagado", void 0);
    __decorate([
        typeorm_1.Column("decimal", { precision: 18.5 }),
        __metadata("design:type", Number)
    ], vieworders.prototype, "Pendiente", void 0);
    __decorate([
        typeorm_1.Column("int", { default: 1 }),
        __metadata("design:type", Number)
    ], vieworders.prototype, "CodFormaPago", void 0);
    __decorate([
        typeorm_1.Column("varchar"),
        __metadata("design:type", String)
    ], vieworders.prototype, "DescripcionFormaPago", void 0);
    __decorate([
        typeorm_1.Column("tinyint", { default: 1 }),
        __metadata("design:type", Number)
    ], vieworders.prototype, "CodigoEstado", void 0);
    __decorate([
        typeorm_1.Column("varchar"),
        __metadata("design:type", String)
    ], vieworders.prototype, "Estado", void 0);
    __decorate([
        typeorm_1.Column("decimal", { precision: 18.2 }),
        __metadata("design:type", Number)
    ], vieworders.prototype, "PorcComision", void 0);
    __decorate([
        typeorm_1.Column({ type: "date" }),
        __metadata("design:type", String)
    ], vieworders.prototype, "SerieFra", void 0);
    __decorate([
        typeorm_1.Column("int"),
        __metadata("design:type", Number)
    ], vieworders.prototype, "NumFra", void 0);
    __decorate([
        typeorm_1.Column("date"),
        __metadata("design:type", String)
    ], vieworders.prototype, "FechaFra", void 0);
    __decorate([
        typeorm_1.Column("int"),
        __metadata("design:type", Number)
    ], vieworders.prototype, "CodDestino", void 0);
    __decorate([
        typeorm_1.Column("decimal", { precision: 18.2 }),
        __metadata("design:type", Number)
    ], vieworders.prototype, "DtoPP", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], vieworders.prototype, "Observaciones", void 0);
    vieworders = __decorate([
        typeorm_1.Entity()
    ], vieworders);
    return vieworders;
}());
exports.vieworders = vieworders;
//# sourceMappingURL=viewOrders.js.map