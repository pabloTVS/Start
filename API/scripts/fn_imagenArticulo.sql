CREATE DEFINER=`startden_dekorativa`@`213.181.68.23` FUNCTION `fn_imagenArticulo`(
	`art` bigint(20)
) RETURNS varchar(200) CHARSET latin1
BEGIN 
	DECLARE valor VARCHAR(200);
	SET valor = (SELECT CONCAT(SUBSTRING_INDEX(guid,'.jpg',1),'-100x100.jpg') Imagen FROM `wp_posts` WHERE post_parent = art AND post_status = 'inherit' AND post_mime_type='image/jpeg' AND post_type ='attachment' ORDER BY ID DESC LIMIT 1);
    IF (valor IS NULL) THEN
    	SET valor = (SELECT CONCAT('https://startdental.es/wp-content/uploads/',substring_index(meta_value,'.',1),'-100x100.jpg') Imagen FROM `wp_postmeta` WHERE post_id in (SELECT meta_value FROM `wp_postmeta` WHERE post_id = art and meta_key='_thumbnail_id') and meta_key = '_wp_attached_file');
    END IF;
	RETURN valor;
END