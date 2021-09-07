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
exports.detailproduct = void 0;
var typeorm_1 = require("typeorm");
var detailproduct = /** @class */ (function () {
    function detailproduct() {
    }
    __decorate([
        typeorm_1.PrimaryColumn(),
        __metadata("design:type", Number)
    ], detailproduct.prototype, "IdArticulo", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], detailproduct.prototype, "_regular_price", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], detailproduct.prototype, "_price", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], detailproduct.prototype, "_sale_price", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], detailproduct.prototype, "_stock", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], detailproduct.prototype, "_tax_class", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], detailproduct.prototype, "refproveedor", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], detailproduct.prototype, "pcoste", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], detailproduct.prototype, "_sku", void 0);
    detailproduct = __decorate([
        typeorm_1.Entity()
    ], detailproduct);
    return detailproduct;
}());
exports.detailproduct = detailproduct;
//# sourceMappingURL=detailproduct.js.map