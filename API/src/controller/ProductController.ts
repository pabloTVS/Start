import { getRepository, getConnection, getManager } from 'typeorm';
import { Request, Response } from 'express';
import { validate } from 'class-validator';

import { viewProducts } from '../entity/viewProducts';
import { wp_posts } from '../entity/Product';
import { wp_postmeta } from '../entity/productDetail';
import { wp_term_relationships } from '../entity/wpTermRelation';

export class ProductController {
    static getAllProducts = async (req: Request, res: Response) =>
    {
      const productRepository = getRepository(viewProducts);

      let products:viewProducts[];

      try {
          products = await productRepository.createQueryBuilder().select(["product.ID","product.Articulo","product.Precio","product.PrecioRebajado","product.stock","product.Sku","product.IVA","product.RefProveedor","product.PCoste","product.Imagen","product.Proveedor","product.Categoria","product.Subcategoria"]).
          from(viewProducts,"product").limit(50000).getMany();

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

        producto ? res.send(producto) : res.status(404).json({ message: 'No se ha devuelto ningún valor.' });
      /*
      const productRepository = getRepository(viewProducts);

      let products :viewProducts;

      products = await productRepository.createQueryBuilder().select(["product.ID","product.Articulo","product.Sku","product.Precio"
          ,"product.IVA","product.Stock","product.Imagen","product.Proveedor","product.Categoria","product.Subcategoria"]).
          from(viewProducts,"product").where("product.ID = :id",{id: Id}).getOne();

      products ? res.send(products) :  res.status(404).json({ message: 'No se ha devuelto ningún valor.' });*/


/*       const { Id } = req.params;
      const productRepository = getRepository(wp_posts);
      try {
        const product = await productRepository.findOneOrFail(Id);
        res.send(product);
      } catch (e) {
        res.status(404).json({ message: 'No se ha devuelto ningún valor.' });
      } */

    };

    static getBySearch = async (req: Request, res: Response) => {
      const {Art,Prov,Cat,Sub} = req.params;
      const productRepository = getRepository(viewProducts);

      let products :viewProducts[];

      products = await productRepository.createQueryBuilder().select(["product.ID","product.Articulo","product.Sku","product.Precio"
          ,"product.IVA","product.Stock","product.Imagen","product.Proveedor","product.Categoria","product.Subcategoria"]).
          from(viewProducts,"product").where("product.Articulo like :art",{art: `%${Art}%`}).getMany();
          //where("product.Articulo like ('%':art'%')",{art: Art}).getMany();

      products ? res.send(products) :  res.status(404).json({ message: 'No se ha devuelto ningún valor.' });
    };

    static edit = async (req: Request, res: Response) => {
      let view:viewProducts;
      let valorRefProv:string;

      const { Id } = req.params;
      const {Articulo,DescCorta,Url,sku,precio,precioRebajado,iva,Estado,stock,IdCategoria,IdSubCategoria,IdProveedor,refproveedor,precioCoste} = req.body;
      
      valorRefProv = '<b>Ref.Fabricante: </b>'+ refproveedor;
      
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
        await getConnection().createQueryBuilder().update(wp_postmeta).set({meta_value: sku})
        .where("post_id = :id and meta_key = :type",{id: Id,type: '_sku'}).execute();
        //compruebo precioRebajado, si es cero borro. En caso contrario actualizo el precio.
        if (precioRebajado === "0") //si me pasa cero pongo el registro en blanco
        {
          await getConnection().createQueryBuilder().update(wp_postmeta).set({meta_value: ''})
          .where("post_id = :id and meta_key = :type",{id: Id,type: '_sale_price'}).execute();
          await getConnection().createQueryBuilder().update(wp_postmeta).set({meta_value: precio})
          .where("post_id = :id and meta_key = :type",{id: Id,type: '_price'}).execute();
        }
        else {
          await getConnection().createQueryBuilder().update(wp_postmeta).set({meta_value: precioRebajado})
          .where("post_id = :id and meta_key = :type",{id: Id,type: '_sale_price'}).execute();
          await getConnection().createQueryBuilder().update(wp_postmeta).set({meta_value: precioRebajado})
          .where("post_id = :id and meta_key = :type",{id: Id,type: '_price'}).execute();
        }
        //Actualizamos Precio
        await getConnection().createQueryBuilder().update(wp_postmeta).set({meta_value: precio})
        .where("post_id = :id and meta_key = :type",{id: Id,type: '_regular_price'}).execute();
        //Actualizamos VAT
        await getConnection().createQueryBuilder().update(wp_postmeta).set({meta_value: iva})
        .where("post_id = :id and meta_key = :type",{id: Id,type: '_tax_class'}).execute();
        //Actualizamos stock
        await getConnection().createQueryBuilder().update(wp_postmeta).set({meta_value: stock})
        .where("post_id = :id and meta_key = :type",{id: Id,type: '_stock'}).execute();
        //Actualizamos refproveedor
        await getConnection().createQueryBuilder().update(wp_postmeta).set({meta_value: valorRefProv})
        .where("post_id = :id and meta_key = :type",{id: Id,type: 'refproveedor'}).execute();
        //Actualizamos pcoste
        await getConnection().createQueryBuilder().update(wp_postmeta).set({meta_value: precioCoste})
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
