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
exports.viewProducts = void 0;
var typeorm_1 = require("typeorm");
var viewProducts = /** @class */ (function () {
    function viewProducts() {
    }
    __decorate([
        typeorm_1.PrimaryColumn(),
        __metadata("design:type", Number)
    ], viewProducts.prototype, "ID", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], viewProducts.prototype, "Articulo", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], viewProducts.prototype, "Url", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], viewProducts.prototype, "DescLarga", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], viewProducts.prototype, "DescCorta", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], viewProducts.prototype, "Estado", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], viewProducts.prototype, "Precio", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], viewProducts.prototype, "PrecioRebajado", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], viewProducts.prototype, "PCoste", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], viewProducts.prototype, "Stock", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], viewProducts.prototype, "Sku", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], viewProducts.prototype, "IVA", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], viewProducts.prototype, "PorcIVA", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], viewProducts.prototype, "refproveedor", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], viewProducts.prototype, "Imagen", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], viewProducts.prototype, "Proveedor", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], viewProducts.prototype, "Categoria", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], viewProducts.prototype, "Subcategoria", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], viewProducts.prototype, "IdProveedor", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], viewProducts.prototype, "IdCategoria", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], viewProducts.prototype, "IdSubCategoria", void 0);
    viewProducts = __decorate([
        typeorm_1.Entity()
    ], viewProducts);
    return viewProducts;
}());
exports.viewProducts = viewProducts;
//# sourceMappingURL=viewProducts.js.map