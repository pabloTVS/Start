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
exports.linorders = void 0;
var typeorm_1 = require("typeorm");
var linorders = /** @class */ (function () {
    function linorders() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        typeorm_1.Generated("increment"),
        __metadata("design:type", Number)
    ], linorders.prototype, "IdLinPed", void 0);
    __decorate([
        typeorm_1.Column("int"),
        __metadata("design:type", Number)
    ], linorders.prototype, "NumPed", void 0);
    __decorate([
        typeorm_1.Column("bigint"),
        __metadata("design:type", Number)
    ], linorders.prototype, "CodArticulo", void 0);
    __decorate([
        typeorm_1.Column("decimal", { precision: 18.5 }),
        __metadata("design:type", Number)
    ], linorders.prototype, "PCosto", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], linorders.prototype, "Descripcion", void 0);
    __decorate([
        typeorm_1.Column("decimal", { precision: 18.2 }),
        __metadata("design:type", Number)
    ], linorders.prototype, "Cantidad", void 0);
    __decorate([
        typeorm_1.Column("decimal", { precision: 18.5 }),
        __metadata("design:type", Number)
    ], linorders.prototype, "Precio", void 0);
    __decorate([
        typeorm_1.Column("decimal", { precision: 18.5 }),
        __metadata("design:type", Number)
    ], linorders.prototype, "SubTotal", void 0);
    __decorate([
        typeorm_1.Column("decimal", { precision: 18.2 }),
        __metadata("design:type", Number)
    ], linorders.prototype, "DtoC", void 0);
    __decorate([
        typeorm_1.Column("decimal", { precision: 18.5 }),
        __metadata("design:type", Number)
    ], linorders.prototype, "ImporteDtoC", void 0);
    __decorate([
        typeorm_1.Column("decimal", { precision: 18.2 }),
        __metadata("design:type", Number)
    ], linorders.prototype, "DtoPP", void 0);
    __decorate([
        typeorm_1.Column("decimal", { precision: 18.5 }),
        __metadata("design:type", Number)
    ], linorders.prototype, "BaseImponible", void 0);
    __decorate([
        typeorm_1.Column("decimal", { precision: 18.2 }),
        __metadata("design:type", Number)
    ], linorders.prototype, "IVA", void 0);
    __decorate([
        typeorm_1.Column("decimal", { precision: 18.5 }),
        __metadata("design:type", Number)
    ], linorders.prototype, "ImporteIVA", void 0);
    __decorate([
        typeorm_1.Column("decimal", { precision: 18.2 }),
        __metadata("design:type", Number)
    ], linorders.prototype, "RE", void 0);
    __decorate([
        typeorm_1.Column("decimal", { precision: 18.5 }),
        __metadata("design:type", Number)
    ], linorders.prototype, "ImporteRE", void 0);
    __decorate([
        typeorm_1.Column("decimal", { precision: 18.5 }),
        __metadata("design:type", Number)
    ], linorders.prototype, "Total", void 0);
    __decorate([
        typeorm_1.Column("int"),
        __metadata("design:type", Number)
    ], linorders.prototype, "CodOferta", void 0);
    __decorate([
        typeorm_1.Column("int"),
        __metadata("design:type", Number)
    ], linorders.prototype, "LinOferta", void 0);
    linorders = __decorate([
        typeorm_1.Entity(),
        typeorm_1.Unique(['IdLinPed'])
    ], linorders);
    return linorders;
}());
exports.linorders = linorders;
//# sourceMappingURL=linOrders.js.map