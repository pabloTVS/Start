import { getRepository, getConnection, getManager } from 'typeorm';
import { Request, Response } from 'express';
import { wp_posts } from '../entity/Product';
import { wp_postmeta } from '../entity/productDetail';
import { viewProducts } from '../entity/viewProducts'
import { validate } from 'class-validator';
import { wp_term_relationships } from '../entity/wpTermRelation';
import { wp_term_taxonomy } from '../entity/wpTermTaxonomy';
import { wp_terms } from '../entity/wpTerms';

export class ProductController {
    static getAllProducts = async (req: Request, res: Response) => 
    {
      const productRepository = getRepository(viewProducts);
      
      let products:viewProducts[];
      
      try {
          products = await productRepository.createQueryBuilder().select(["product.ID","product.Articulo","product.Sku","product.Imagen","product.Proveedor","product.Categoria","product.Subcategoria"]).
          from(viewProducts,"product").limit(30000).getMany(); 

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
        stock: string;
        iva: string;
      }
      
      let producto: product;
      producto = await getManager().createQueryBuilder(wp_posts, "prod").select(["prod.ID", "prod.post_title Articulo", "prod.post_name Url",
        "prod.post_content DescLarga", "prod.post_excerpt DescCorta", "prod.post_status Estado"])
        .addSelect(["det.Sku sku","det.Categoria","det.Proveedor","det.Subcategoria","det.Imagen"])
        .innerJoin(viewProducts,"det","prod.ID=det.ID")
        .addSelect("det1.meta_value precio")
        .innerJoin(wp_postmeta,"det1","prod.ID=det1.post_id and det1.meta_key='_price'")
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

      const { Id } = req.params;
      const {articulo,DescLarga,DescCorta,Url,sku,precio,stock} = req.body;

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
        await getConnection().createQueryBuilder().update(wp_posts).set({post_title:articulo,post_content:DescLarga,post_excerpt:DescCorta,post_name:Url})
        .where("ID = :id",{id: Id}).execute();
        //actualizo el resto, tabla detalles.
        //Actualizamos SKU
        await getConnection().createQueryBuilder().update(wp_postmeta).set({meta_value: sku})
        .where("post_id = :id and meta_key = :type",{id: Id,type: '_sku'}).execute();
        //Actualizamos Precio
        await getConnection().createQueryBuilder().update(wp_postmeta).set({meta_value: precio})
        .where("post_id = :id and meta_key = :type",{id: Id,type: '_price'}).execute();
        //Actualizamos Stock
        await getConnection().createQueryBuilder().update(wp_postmeta).set({meta_value: stock})
        .where("post_id = :id and meta_key = :type",{id: Id,type: '_stock'}).execute();

      } catch (e) {
        return res.status(409).json({ message: 'Error guardando el artículo.' });
      }
   
      res.status(201).json({ message: 'Cambios guardados.' });
  
    };
}

export default ProductController;