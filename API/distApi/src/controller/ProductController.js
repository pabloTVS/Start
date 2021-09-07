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
exports.ProductController = void 0;
var typeorm_1 = require("typeorm");
var class_validator_1 = require("class-validator");
var viewProducts_1 = require("../entity/viewProducts");
var Product_1 = require("../entity/Product");
var productDetail_1 = require("../entity/productDetail");
var wpTermRelation_1 = require("../entity/wpTermRelation");
var detailproduct_1 = require("../entity/detailproduct");
var ProductController = /** @class */ (function () {
    function ProductController() {
    }
    ProductController.getAllProducts = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var productRepository, products, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    productRepository = typeorm_1.getRepository(viewProducts_1.viewProducts);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, productRepository.find()];
                case 2:
                    products = _a.sent();
                    products ? res.send(products) : res.status(404).json({ message: 'No se ha devuelto ningún valor.' });
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    res.status(400).json({ message: e_1.message });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    ProductController.getById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var Id, prod, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    Id = req.params.Id;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, typeorm_1.getManager().createQueryBuilder(Product_1.wp_posts, "p").select(["p.ID ID", "p.post_title Articulo", "p.post_name Url", "p.post_content DescLarga", "p.post_excerpt DescCorta", "p.post_status Estado"])
                            .addSelect(["dt._regular_price Precio", "dt._sale_price PrecioRebajado", "dt._stock Stock", "dt._sku Sku", "dt._tax_class IVA",
                            "CASE WHEN dt._tax_class ='' THEN 21 ELSE CASE WHEN dt._tax_class = 'tasa-reducida' THEN 10 ELSE CASE WHEN dt._tax_class = 'tasa-superreducida' THEN 4 ELSE 0 END END END PorcIVA",
                            "case when substring(dt.refproveedor,1,3) ='<b>' then substring(dt.refproveedor,24,length(dt.refproveedor)) else dt.refproveedor end refproveedor", "dt.pcoste PCoste", "fn_imagenArticulo(Id) Imagen",
                            "(SELECT ter.name Proveedor FROM wp_term_relationships rel left join wp_terms ter on rel.term_taxonomy_id=ter.term_id WHERE rel.object_id = ID AND ter.term_id in (select term_id FROM wp_term_taxonomy WHERE parent = 23)) Proveedor",
                            "(SELECT ter.name FROM wp_term_relationships rel left join wp_terms ter on rel.term_taxonomy_id=ter.term_id WHERE rel.object_id = ID AND ter.term_id in (select term_id FROM wp_term_taxonomy WHERE parent = 24)) Categoria",
                            "(SELECT ter.name FROM wp_term_relationships rel left join wp_terms ter on rel.term_taxonomy_id=ter.term_id WHERE rel.object_id = ID AND ter.term_id in (select term_id FROM wp_term_taxonomy WHERE parent > 24)) Subcategoria",
                            "(SELECT term_taxonomy_id IdCategoria  FROM wp_term_relationships WHERE object_id = ID and term_taxonomy_id in (select term_id FROM wp_term_taxonomy WHERE parent =23)) IdProveedor",
                            "(SELECT term_taxonomy_id IdCategoria  FROM wp_term_relationships WHERE object_id = ID and term_taxonomy_id in (select term_id FROM wp_term_taxonomy WHERE parent =24)) IdCategoria",
                            "(SELECT term_taxonomy_id IdCategoria  FROM wp_term_relationships WHERE object_id = ID and term_taxonomy_id in (select term_id FROM wp_term_taxonomy WHERE parent >24)) IdSubCategoria"])
                            .innerJoin(detailproduct_1.detailproduct, "dt", "p.ID=dt.IdArticulo")
                            .where("p.post_type = 'product' AND p.ID=:id", { id: Id }).getRawOne()];
                case 2:
                    prod = _a.sent();
                    res.send(prod);
                    return [3 /*break*/, 4];
                case 3:
                    e_2 = _a.sent();
                    res.status(404).json({ message: 'No se ha devuelto ningún valor.' });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    ProductController.edit = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var view, valorRefProv, Id, _a, Articulo, DescCorta, Url, Sku, Precio, PrecioRebajado, IVA, Estado, Stock, IdCategoria, IdSubCategoria, IdProveedor, refproveedor, PCoste, viewRepository, e_3, validationOpt, errors, e_4;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    Id = req.params.Id;
                    _a = req.body, Articulo = _a.Articulo, DescCorta = _a.DescCorta, Url = _a.Url, Sku = _a.Sku, Precio = _a.Precio, PrecioRebajado = _a.PrecioRebajado, IVA = _a.IVA, Estado = _a.Estado, Stock = _a.Stock, IdCategoria = _a.IdCategoria, IdSubCategoria = _a.IdSubCategoria, IdProveedor = _a.IdProveedor, refproveedor = _a.refproveedor, PCoste = _a.PCoste;
                    if (refproveedor)
                        valorRefProv = '<b>Ref.Fabricante: </b>' + refproveedor;
                    viewRepository = typeorm_1.getRepository(viewProducts_1.viewProducts);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, viewRepository.findOneOrFail(Id)];
                case 2:
                    view = _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_3 = _b.sent();
                    res.status(404).json({ message: 'No se ha devuelto ningún valor.' });
                    return [3 /*break*/, 4];
                case 4:
                    validationOpt = { validationError: { target: false, value: false } };
                    return [4 /*yield*/, class_validator_1.validate(view, validationOpt)];
                case 5:
                    errors = _b.sent();
                    if (errors.length > 0) {
                        return [2 /*return*/, res.status(400).json(errors)];
                    }
                    _b.label = 6;
                case 6:
                    _b.trys.push([6, 23, , 24]);
                    //actualizo el título, tabla wp_post (principal).
                    return [4 /*yield*/, typeorm_1.getConnection().createQueryBuilder().update(Product_1.wp_posts).set({ post_title: Articulo, post_excerpt: DescCorta, post_name: Url, post_status: Estado })
                            .where("ID = :id", { id: Id }).execute()];
                case 7:
                    //actualizo el título, tabla wp_post (principal).
                    _b.sent();
                    //actualizo el resto, tabla detalles.
                    //Actualizamos SKU
                    return [4 /*yield*/, typeorm_1.getConnection().createQueryBuilder().update(productDetail_1.wp_postmeta).set({ meta_value: Sku })
                            .where("post_id = :id and meta_key = :type", { id: Id, type: '_sku' }).execute()];
                case 8:
                    //actualizo el resto, tabla detalles.
                    //Actualizamos SKU
                    _b.sent();
                    if (!(PrecioRebajado === "0")) return [3 /*break*/, 11];
                    return [4 /*yield*/, typeorm_1.getConnection().createQueryBuilder().update(productDetail_1.wp_postmeta).set({ meta_value: '' })
                            .where("post_id = :id and meta_key = :type", { id: Id, type: '_sale_price' }).execute()];
                case 9:
                    _b.sent();
                    return [4 /*yield*/, typeorm_1.getConnection().createQueryBuilder().update(productDetail_1.wp_postmeta).set({ meta_value: Precio })
                            .where("post_id = :id and meta_key = :type", { id: Id, type: '_price' }).execute()];
                case 10:
                    _b.sent();
                    return [3 /*break*/, 14];
                case 11: return [4 /*yield*/, typeorm_1.getConnection().createQueryBuilder().update(productDetail_1.wp_postmeta).set({ meta_value: PrecioRebajado })
                        .where("post_id = :id and meta_key = :type", { id: Id, type: '_sale_price' }).execute()];
                case 12:
                    _b.sent();
                    return [4 /*yield*/, typeorm_1.getConnection().createQueryBuilder().update(productDetail_1.wp_postmeta).set({ meta_value: PrecioRebajado })
                            .where("post_id = :id and meta_key = :type", { id: Id, type: '_price' }).execute()];
                case 13:
                    _b.sent();
                    _b.label = 14;
                case 14: 
                //Actualizamos Precio
                return [4 /*yield*/, typeorm_1.getConnection().createQueryBuilder().update(productDetail_1.wp_postmeta).set({ meta_value: Precio })
                        .where("post_id = :id and meta_key = :type", { id: Id, type: '_regular_price' }).execute()];
                case 15:
                    //Actualizamos Precio
                    _b.sent();
                    //Actualizamos VAT
                    return [4 /*yield*/, typeorm_1.getConnection().createQueryBuilder().update(productDetail_1.wp_postmeta).set({ meta_value: IVA })
                            .where("post_id = :id and meta_key = :type", { id: Id, type: '_tax_class' }).execute()];
                case 16:
                    //Actualizamos VAT
                    _b.sent();
                    //Actualizamos stock
                    return [4 /*yield*/, typeorm_1.getConnection().createQueryBuilder().update(productDetail_1.wp_postmeta).set({ meta_value: Stock })
                            .where("post_id = :id and meta_key = :type", { id: Id, type: '_stock' }).execute()];
                case 17:
                    //Actualizamos stock
                    _b.sent();
                    //Actualizamos refproveedor
                    return [4 /*yield*/, typeorm_1.getConnection().createQueryBuilder().update(productDetail_1.wp_postmeta).set({ meta_value: valorRefProv })
                            .where("post_id = :id and meta_key = :type", { id: Id, type: 'refproveedor' }).execute()];
                case 18:
                    //Actualizamos refproveedor
                    _b.sent();
                    //Actualizamos pcoste
                    return [4 /*yield*/, typeorm_1.getConnection().createQueryBuilder().update(productDetail_1.wp_postmeta).set({ meta_value: PCoste })
                            .where("post_id = :id and meta_key = :type", { id: Id, type: 'pcoste' }).execute()];
                case 19:
                    //Actualizamos pcoste
                    _b.sent();
                    //Actualizamos proveedor
                    return [4 /*yield*/, typeorm_1.getConnection().createQueryBuilder().update(wpTermRelation_1.wp_term_relationships).set({ term_taxonomy_id: IdProveedor })
                            .where("object_id = :id and term_taxonomy_id in (select term_id from wp_term_taxonomy where parent = 23)", { id: Id })
                            .execute()];
                case 20:
                    //Actualizamos proveedor
                    _b.sent();
                    //Actualizamos categoria
                    return [4 /*yield*/, typeorm_1.getConnection().createQueryBuilder().update(wpTermRelation_1.wp_term_relationships).set({ term_taxonomy_id: IdCategoria })
                            .where("object_id = :id and term_taxonomy_id in (select term_id from wp_term_taxonomy where parent = 24)", { id: Id })
                            .execute()];
                case 21:
                    //Actualizamos categoria
                    _b.sent();
                    //Actualizamos subcategoria
                    return [4 /*yield*/, typeorm_1.getConnection().createQueryBuilder().update(wpTermRelation_1.wp_term_relationships).set({ term_taxonomy_id: IdSubCategoria })
                            .where("object_id = :id and term_taxonomy_id in (select term_id from wp_term_taxonomy where parent > 24)", { id: Id })
                            .execute()];
                case 22:
                    //Actualizamos subcategoria
                    _b.sent();
                    return [3 /*break*/, 24];
                case 23:
                    e_4 = _b.sent();
                    return [2 /*return*/, res.status(409).json({ message: 'Error guardando el artículo.' })];
                case 24:
                    res.status(201).json({ message: 'Cambios guardados.' });
                    return [2 /*return*/];
            }
        });
    }); };
    return ProductController;
}());
exports.ProductController = ProductController;
exports.default = ProductController;
//# sourceMappingURL=ProductController.js.map