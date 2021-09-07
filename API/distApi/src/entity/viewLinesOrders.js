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
exports.viewlinesorders = void 0;
var typeorm_1 = require("typeorm");
var viewlinesorders = /** @class */ (function () {
    function viewlinesorders() {
    }
    __decorate([
        typeorm_1.PrimaryColumn(),
        __metadata("design:type", Number)
    ], viewlinesorders.prototype, "IdLinPed", void 0);
    __decorate([
        typeorm_1.Column("int"),
        __metadata("design:type", Number)
    ], viewlinesorders.prototype, "NumPed", void 0);
    __decorate([
        typeorm_1.Column("bigint"),
        __metadata("design:type", Number)
    ], viewlinesorders.prototype, "CodArticulo", void 0);
    __decorate([
        typeorm_1.Column("decimal", { precision: 18.5 }),
        __metadata("design:type", Number)
    ], viewlinesorders.prototype, "PCosto", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], viewlinesorders.prototype, "Descripcion", void 0);
    __decorate([
        typeorm_1.Column("decimal", { precision: 18.2 }),
        __metadata("design:type", Number)
    ], viewlinesorders.prototype, "Cantidad", void 0);
    __decorate([
        typeorm_1.Column("decimal", { precision: 18.5 }),
        __metadata("design:type", Number)
    ], viewlinesorders.prototype, "Precio", void 0);
    __decorate([
        typeorm_1.Column("decimal", { precision: 18.5 }),
        __metadata("design:type", Number)
    ], viewlinesorders.prototype, "SubTotal", void 0);
    __decorate([
        typeorm_1.Column("decimal", { precision: 18.2 }),
        __metadata("design:type", Number)
    ], viewlinesorders.prototype, "DtoC", void 0);
    __decorate([
        typeorm_1.Column("decimal", { precision: 18.5 }),
        __metadata("design:type", Number)
    ], viewlinesorders.prototype, "ImporteDtoC", void 0);
    __decorate([
        typeorm_1.Column("decimal", { precision: 18.2 }),
        __metadata("design:type", Number)
    ], viewlinesorders.prototype, "DtoPP", void 0);
    __decorate([
        typeorm_1.Column("decimal", { precision: 18.5 }),
        __metadata("design:type", Number)
    ], viewlinesorders.prototype, "BaseImponible", void 0);
    __decorate([
        typeorm_1.Column("decimal", { precision: 18.2 }),
        __metadata("design:type", Number)
    ], viewlinesorders.prototype, "IVA", void 0);
    __decorate([
        typeorm_1.Column("decimal", { precision: 18.5 }),
        __metadata("design:type", Number)
    ], viewlinesorders.prototype, "ImporteIVA", void 0);
    __decorate([
        typeorm_1.Column("decimal", { precision: 18.2 }),
        __metadata("design:type", Number)
    ], viewlinesorders.prototype, "RE", void 0);
    __decorate([
        typeorm_1.Column("decimal", { precision: 18.5 }),
        __metadata("design:type", Number)
    ], viewlinesorders.prototype, "ImporteRE", void 0);
    __decorate([
        typeorm_1.Column("decimal", { precision: 18.5 }),
        __metadata("design:type", Number)
    ], viewlinesorders.prototype, "Total", void 0);
    __decorate([
        typeorm_1.Column("int"),
        __metadata("design:type", Number)
    ], viewlinesorders.prototype, "CodOferta", void 0);
    __decorate([
        typeorm_1.Column("int"),
        __metadata("design:type", Number)
    ], viewlinesorders.prototype, "LinOferta", void 0);
    __decorate([
        typeorm_1.Column("nvarchar"),
        __metadata("design:type", String)
    ], viewlinesorders.prototype, "Imagen", void 0);
    viewlinesorders = __decorate([
        typeorm_1.Entity()
    ], viewlinesorders);
    return viewlinesorders;
}());
exports.viewlinesorders = viewlinesorders;
//# sourceMappingURL=viewLinesOrders.js.map