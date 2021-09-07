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
exports.Orders = void 0;
var typeorm_1 = require("typeorm");
var Orders = /** @class */ (function () {
    function Orders() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Orders.prototype, "NumPed", void 0);
    __decorate([
        typeorm_1.Column("varchar", { length: 1 }),
        __metadata("design:type", String)
    ], Orders.prototype, "Serie", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", String)
    ], Orders.prototype, "Fecha", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", String)
    ], Orders.prototype, "FechaEntrega", void 0);
    __decorate([
        typeorm_1.Column("int"),
        __metadata("design:type", Number)
    ], Orders.prototype, "CodCli", void 0);
    __decorate([
        typeorm_1.Column("decimal", { precision: 18.2 }),
        __metadata("design:type", Number)
    ], Orders.prototype, "DtoPP", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Orders.prototype, "Observaciones", void 0);
    __decorate([
        typeorm_1.Column("decimal", { precision: 18.5 }),
        __metadata("design:type", Number)
    ], Orders.prototype, "TotalPedido", void 0);
    __decorate([
        typeorm_1.Column("decimal", { precision: 18.5 }),
        __metadata("design:type", Number)
    ], Orders.prototype, "TotalPagado", void 0);
    __decorate([
        typeorm_1.Column("decimal", { precision: 18.5 }),
        __metadata("design:type", Number)
    ], Orders.prototype, "TotalPendiente", void 0);
    __decorate([
        typeorm_1.Column({ type: "date" }),
        __metadata("design:type", String)
    ], Orders.prototype, "SerieFra", void 0);
    __decorate([
        typeorm_1.Column("int"),
        __metadata("design:type", Number)
    ], Orders.prototype, "NumFra", void 0);
    __decorate([
        typeorm_1.Column("date"),
        __metadata("design:type", String)
    ], Orders.prototype, "FechaFra", void 0);
    __decorate([
        typeorm_1.Column("int", { default: 0 }),
        __metadata("design:type", Number)
    ], Orders.prototype, "CodComercial", void 0);
    __decorate([
        typeorm_1.Column("decimal", { precision: 18.2 }),
        __metadata("design:type", Number)
    ], Orders.prototype, "Comision", void 0);
    __decorate([
        typeorm_1.Column("int"),
        __metadata("design:type", Number)
    ], Orders.prototype, "CodDestino", void 0);
    __decorate([
        typeorm_1.Column("tinyint", { default: 1 }),
        __metadata("design:type", Number)
    ], Orders.prototype, "CodOrdStatus", void 0);
    __decorate([
        typeorm_1.Column("int", { default: 1 }),
        __metadata("design:type", Number)
    ], Orders.prototype, "CodFormaPago", void 0);
    Orders = __decorate([
        typeorm_1.Entity(),
        typeorm_1.Unique(['NumPed'])
    ], Orders);
    return Orders;
}());
exports.Orders = Orders;
//# sourceMappingURL=orders.js.map