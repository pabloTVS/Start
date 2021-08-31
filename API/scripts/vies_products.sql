CREATE 
    ALGORITHM = MERGE 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `view_products` AS
    SELECT 
        `wp`.`ID` AS `ID`,
        `wp`.`post_title` AS `Articulo`,
        FN_NOMBRECATEGORIA(`wp`.`ID`) AS `Categoria`,
        FN_NOMBREPROVEEDOR(`wp`.`ID`) AS `Proveedor`,
        FN_NOMBRESUBCATEGORIA(`wp`.`ID`) AS `Subcategoria`,
        FN_IMAGENARTICULO(`wp`.`ID`) AS `Imagen`,
        `wm`.`meta_value` AS `Sku`
    FROM
        (`wp_posts` `wp`
        JOIN `wp_postmeta` `wm` ON (((`wp`.`ID` = `wm`.`post_id`)
            AND (`wm`.`meta_key` = '_sku'))))
    WHERE
        (`wp`.`post_type` = 'product')