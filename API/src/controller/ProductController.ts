import { getRepository, getConnection, getManager } from 'typeorm';
import { Request, Response } from 'express';
import { validate } from 'class-validator';

import { viewProducts } from '../entity/viewProducts';
import { wp_posts } from '../entity/Product';
import { wp_postmeta } from '../entity/productDetail';
import { wp_term_relationships } from '../entity/wpTermRelation';
import { detailproduct } from '../entity/detailproduct';

export class ProductController {
    static getAllProducts = async (req: Request, res: Response) =>
    {
      const productRepository = getRepository(viewProducts);

      let products:viewProducts[];

      try {
        products = await productRepository.find();

          products ? res.send(products) :  res.status(404).json({ message: 'No se ha devuelto ningún valor.' });
        }
        catch (e) {
          res.status(400).json({message: e.message })
        }

     /* const productRepository = getRepository(wp_posts);
      let type:any;
      let products:any;

      try {
          products = await productRepository.createQueryBuilder().
          select(["product.ID","product.post_date","product.post_title","product.post_name","product.guid"]).
          from(wp_posts,"product").where("product.post_type = :type",{type: 'product'}).limit(5).getMany();

          products.length ? res.send(products) :  res.status(404).json({ message: 'No se ha devuelto ningún valor.' });
        }
        catch (e) {
          res.status(400).json({message: '¡¡Algo ha fallado!!'})
        }*/
    };

    static getById = async (req: Request, res: Response) => {
        const {Id} = req.params;

        let prod : viewProducts;
        try {
           prod = await getManager().createQueryBuilder(wp_posts,"p").select(["p.ID ID","p.post_title Articulo","p.post_name Url","p.post_content DescLarga","p.post_excerpt DescCorta","p.post_status Estado"])
          .addSelect(["dt._regular_price Precio","dt._sale_price PrecioRebajado","dt._stock Stock","dt._sku Sku","dt._tax_class IVA",
          "CASE WHEN dt._tax_class ='' THEN 21 ELSE CASE WHEN dt._tax_class = 'tasa-reducida' THEN 10 ELSE CASE WHEN dt._tax_class = 'tasa-superreducida' THEN 4 ELSE 0 END END END PorcIVA",
          "case when substring(dt.refproveedor,1,3) ='<b>' then substring(dt.refproveedor,24,length(dt.refproveedor)) else dt.refproveedor end refproveedor","dt.pcoste PCoste","fn_imagenArticulo(Id) Imagen",
          "(SELECT ter.name Proveedor FROM wp_term_relationships rel left join wp_terms ter on rel.term_taxonomy_id=ter.term_id WHERE rel.object_id = ID AND ter.term_id in (select term_id FROM wp_term_taxonomy WHERE parent = 23)) Proveedor",
          "(SELECT ter.name FROM wp_term_relationships rel left join wp_terms ter on rel.term_taxonomy_id=ter.term_id WHERE rel.object_id = ID AND ter.term_id in (select term_id FROM wp_term_taxonomy WHERE parent = 24)) Categoria",
          "(SELECT ter.name FROM wp_term_relationships rel left join wp_terms ter on rel.term_taxonomy_id=ter.term_id WHERE rel.object_id = ID AND ter.term_id in (select term_id FROM wp_term_taxonomy WHERE parent > 24)) Subcategoria",
          "(SELECT term_taxonomy_id IdCategoria  FROM wp_term_relationships WHERE object_id = ID and term_taxonomy_id in (select term_id FROM wp_term_taxonomy WHERE parent =23)) IdProveedor",
          "(SELECT term_taxonomy_id IdCategoria  FROM wp_term_relationships WHERE object_id = ID and term_taxonomy_id in (select term_id FROM wp_term_taxonomy WHERE parent =24)) IdCategoria",
          "(SELECT term_taxonomy_id IdCategoria  FROM wp_term_relationships WHERE object_id = ID and term_taxonomy_id in (select term_id FROM wp_term_taxonomy WHERE parent >24)) IdSubCategoria"])
          .innerJoin(detailproduct,"dt","p.ID=dt.IdArticulo")
          .where("p.post_type = 'product' AND p.ID=:id",{id: Id}).getRawOne();
 
          res.send(prod);
        } catch (e) {
          res.status(404).json({ message: 'No se ha devuelto ningún valor.' });
        }
     /* const {Id} = req.params;
      class product {
        ID: number;
        Articulo: string;
        Url: string;
        DescLarga: string;
        DescCorta: string;
        Estado: string;
        sku: string;
        precio: string;
        precioRebajado: string;
        stock: string;
        iva: string;
        refproveedor: string;
        precioCoste:string;
      }

      let producto: product;
      producto = await getManager().createQueryBuilder(wp_posts, "prod").select(["prod.ID", "prod.post_title Articulo", "prod.post_name Url",
        "prod.post_content DescLarga", "prod.post_excerpt DescCorta", "prod.post_status Estado"])
        .addSelect(["det.Sku sku","det.Categoria","det.Proveedor","det.Subcategoria","det.Imagen"])
        .innerJoin(viewProducts,"det","prod.ID=det.ID")
        .addSelect("det1.meta_value precio")
        .innerJoin(wp_postmeta,"det1","prod.ID=det1.post_id and det1.meta_key='_regular_price'")
        .addSelect("det2.meta_value stock")
        .innerJoin(wp_postmeta,"det2","prod.ID=det2.post_id and det2.meta_key='_stock'")
        .addSelect("det3.meta_value iva")
        .innerJoin(wp_postmeta,"det3","prod.ID=det3.post_id and det3.meta_key='_tax_class'")
        .addSelect("det4.term_taxonomy_id IdProveedor")
        .innerJoin(wp_term_relationships,"det4","prod.ID=det4.object_id and det4.term_taxonomy_id in (select term_id FROM wp_term_taxonomy WHERE parent = 23 )")
        .addSelect("det5.term_taxonomy_id IdCategoria")
        .innerJoin(wp_term_relationships,"det5","prod.ID=det5.object_id and det5.term_taxonomy_id in (select term_id FROM wp_term_taxonomy WHERE parent = 24 )")
        .addSelect("det6.term_taxonomy_id IdSubCategoria")
        .innerJoin(wp_term_relationships,"det6","prod.ID=det6.object_id and det6.term_taxonomy_id in (select term_id FROM wp_term_taxonomy WHERE parent > 24 )")
        .addSelect("det7.meta_value precioRebajado")
        .innerJoin(wp_postmeta,"det7","prod.ID=det7.post_id and det7.meta_key='_sale_price'")
        .addSelect("case when substring(det8.meta_value,1,3) ='<b>' then substring(det8.meta_value,24,length(det8.meta_value)) else det8.meta_value end refproveedor")
        .innerJoin(wp_postmeta,"det8","prod.ID=det8.post_id and det8.meta_key='refproveedor'")
        .addSelect("det9.meta_value precioCoste")
        .innerJoin(wp_postmeta,"det9","prod.ID=det9.post_id and det9.meta_key='pcoste'")
        .where("prod.ID=:id",{id: Id}).getRawOne();

        producto ? res.send(producto) : res.status(404).json({ message: 'No se ha devuelto ningún valor.' });*/

/*
      const { Id } = req.params;
      const productRepository = getRepository(viewProducts);
      try {
        const product = await productRepository.findOneOrFail(Id);
        res.send(product);
      } catch (e) {
        res.status(404).json({ message: 'No se ha devuelto ningún valor.' });
      } */

    };


    static edit = async (req: Request, res: Response) => {
      let view:viewProducts;
      let valorRefProv:string;

      const { Id } = req.params;
      const {Articulo,DescCorta,Url,Sku,Precio,PrecioRebajado,IVA,Estado,Stock,IdCategoria,IdSubCategoria,IdProveedor,refproveedor,PCoste} = req.body;
      
      if (refproveedor)   valorRefProv = '<b>Ref.Fabricante: </b>'+ refproveedor;
      
      const viewRepository = getRepository(viewProducts);

      try {
        view = await viewRepository.findOneOrFail(Id);
      } catch (e) {
        res.status(404).json({ message: 'No se ha devuelto ningún valor.' });
      }

      const validationOpt = { validationError: { target: false, value: false } };
      const errors = await validate(view, validationOpt) ;

      if (errors.length > 0) {
        return res.status(400).json(errors);
      }

      // Try to save producto
       try {
        //actualizo el título, tabla wp_post (principal).
        await getConnection().createQueryBuilder().update(wp_posts).set({post_title:Articulo,post_excerpt:DescCorta,post_name:Url,post_status:Estado})
        .where("ID = :id",{id: Id}).execute();
        //actualizo el resto, tabla detalles.
        //Actualizamos SKU
        await getConnection().createQueryBuilder().update(wp_postmeta).set({meta_value: Sku})
        .where("post_id = :id and meta_key = :type",{id: Id,type: '_sku'}).execute();
        //compruebo precioRebajado, si es cero borro. En caso contrario actualizo el precio.
        if (PrecioRebajado === "0") //si me pasa cero pongo el registro en blanco
        {
          await getConnection().createQueryBuilder().update(wp_postmeta).set({meta_value: ''})
          .where("post_id = :id and meta_key = :type",{id: Id,type: '_sale_price'}).execute();
          await getConnection().createQueryBuilder().update(wp_postmeta).set({meta_value: Precio})
          .where("post_id = :id and meta_key = :type",{id: Id,type: '_price'}).execute();
        }
        else {
          await getConnection().createQueryBuilder().update(wp_postmeta).set({meta_value: PrecioRebajado})
          .where("post_id = :id and meta_key = :type",{id: Id,type: '_sale_price'}).execute();
          await getConnection().createQueryBuilder().update(wp_postmeta).set({meta_value: PrecioRebajado})
          .where("post_id = :id and meta_key = :type",{id: Id,type: '_price'}).execute();
        }
        //Actualizamos Precio
        await getConnection().createQueryBuilder().update(wp_postmeta).set({meta_value: Precio})
        .where("post_id = :id and meta_key = :type",{id: Id,type: '_regular_price'}).execute();
        //Actualizamos VAT
        await getConnection().createQueryBuilder().update(wp_postmeta).set({meta_value: IVA})
        .where("post_id = :id and meta_key = :type",{id: Id,type: '_tax_class'}).execute();
        //Actualizamos stock
        await getConnection().createQueryBuilder().update(wp_postmeta).set({meta_value: Stock})
        .where("post_id = :id and meta_key = :type",{id: Id,type: '_stock'}).execute();
        //Actualizamos refproveedor
        await getConnection().createQueryBuilder().update(wp_postmeta).set({meta_value: valorRefProv})
        .where("post_id = :id and meta_key = :type",{id: Id,type: 'refproveedor'}).execute();
        //Actualizamos pcoste
        await getConnection().createQueryBuilder().update(wp_postmeta).set({meta_value: PCoste})
        .where("post_id = :id and meta_key = :type",{id: Id,type: 'pcoste'}).execute();
        //Actualizamos proveedor
        await getConnection().createQueryBuilder().update(wp_term_relationships).set({term_taxonomy_id: IdProveedor})
        .where("object_id = :id and term_taxonomy_id in (select term_id from wp_term_taxonomy where parent = 23)",{id:Id})
        .execute();
        //Actualizamos categoria
        await getConnection().createQueryBuilder().update(wp_term_relationships).set({term_taxonomy_id: IdCategoria})
        .where("object_id = :id and term_taxonomy_id in (select term_id from wp_term_taxonomy where parent = 24)",{id:Id})
        .execute();
        //Actualizamos subcategoria
        await getConnection().createQueryBuilder().update(wp_term_relationships).set({term_taxonomy_id: IdSubCategoria})
        .where("object_id = :id and term_taxonomy_id in (select term_id from wp_term_taxonomy where parent > 24)",{id:Id})
        .execute();


      } catch (e) {
        return res.status(409).json({ message: 'Error guardando el artículo.' });
      }

      res.status(201).json({ message: 'Cambios guardados.' });

    };
}

export default ProductController;
