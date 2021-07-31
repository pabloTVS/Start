CREATE DEFINER=`startden_dekorativa`@`213.181.68.23` FUNCTION `fn_imagenArticulo`(
	`art` bigint(20)
) RETURNS varchar(200) CHARSET latin1
BEGIN 
	DECLARE valor VARCHAR(200);
	SET valor = (SELECT CONCAT('https://startdental.es/wp-content/uploads/2021/03/',substring_index(post_title,'.',1),'-100x100.jpg') Imagen FROM `wp_posts` WHERE post_parent = art ORDER BY ID DESC LIMIT 1)
	RETURN valor;
END