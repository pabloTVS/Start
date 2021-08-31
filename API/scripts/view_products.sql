CREATE 
    ALGORITHM = MERGE 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `view_products` AS
SELECT ID AS ID,post_title AS Articulo,dt._regular_price AS Precio,dt._sale_price AS PrecioRebajado,dt._stock AS Stock,dt._sku AS Sku,
CASE WHEN dt._tax_class ='' THEN 21 ELSE CASE WHEN dt._tax_class = 'tasa-reducida' THEN 10 ELSE CASE WHEN dt._tax_class = 'tasa-superreducida' THEN 4 ELSE 0 END END END AS IVA,
case when substring(dt.refproveedor,1,3) ='<b>' then substring(dt.refproveedor,24,length(dt.refproveedor)) else dt.refproveedor end refproveedor,dt.pcoste AS PCoste,fn_imagenArticulo(Id) As Imagen,
(SELECT ter.name Proveedor FROM wp_term_relationships rel left join wp_terms ter on rel.term_taxonomy_id=ter.term_id WHERE rel.object_id = ID AND ter.term_id in (select term_id FROM wp_term_taxonomy WHERE parent = 23)) AS Proveedor,
(SELECT ter.name FROM wp_term_relationships rel left join wp_terms ter on rel.term_taxonomy_id=ter.term_id WHERE rel.object_id = ID AND ter.term_id in (select term_id FROM wp_term_taxonomy WHERE parent = 24)) AS Categoria,
(SELECT ter.name FROM wp_term_relationships rel left join wp_terms ter on rel.term_taxonomy_id=ter.term_id WHERE rel.object_id = ID AND ter.term_id in (select term_id FROM wp_term_taxonomy WHERE parent > 24)) AS Subcategoria
FROM wp_posts LEFT JOIN detailproduct dt ON ID=dt.IdArticulo WHERE post_type = 'product' ORDER BY Articulo