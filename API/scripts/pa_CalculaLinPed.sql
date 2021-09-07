CREATE DEFINER=`root`@`localhost` PROCEDURE `pa_CalculaLinPed`( in pedido int, in linea int)
BEGIN
SELECT IFNULL(Serie,'A') INTO @serie FROM orders WHERE NumPed=pedido;
SELECT IFNULL(CodFormaPago,1) INTO @formaPago FROM orders WHERE NumPed=pedido;
SELECT IFNULL(RE,0) INTO @recli FROM customers WHERE IdCliente in (SELECT CodCli FROM orders WHERE NumPed=pedido);

SELECT 
    IFNULL(Cantidad, 0)
INTO @cantidad FROM
    linorders
WHERE   NumPed = pedido AND IdLinPed = linea;

SELECT 
    IFNULL(Precio, 0)
INTO @precio FROM
    linorders
WHERE
    NumPed = pedido AND IdLinPed = linea;
    
SELECT 
    IFNULL(DtoC, 0)
INTO @dtoC FROM
    linorders
WHERE
    NumPed = pedido AND IdLinPed = linea;

SELECT 
    IFNULL(DtoPP, 0)
INTO @dtoPP FROM
    linorders
WHERE
    NumPed = pedido AND IdLinPed = linea;


SELECT 
    IFNULL(IVA, 0)
INTO @IVA FROM
    linorders
WHERE
    NumPed = pedido AND IdLinPed = linea;

IF (@recli = 1) THEN
    IF (@IVA = 21) THEN
        SET @RE = 5.20; 
    ELSEIF (@IVA = 10) THEN
            SET @RE = 1.40;
         ELSE SET @RE = 0;
    END IF;
ELSE SET @RE = 0;
END IF;

						
	SET @subTotal = IFNULL(CONVERT(@cantidad * @precio,DECIMAL(18,5)),0);
	SET @importeDtoC = IFNULL(CONVERT(@subTotal*(@dtoC/100),DECIMAL(18,5)),0);
	SET @totalBase = IFNULL(CONVERT(@subTotal - @importeDtoC,DECIMAL(18,5)),0);
    SET @importeDtoPP = IFNULL(CONVERT(@totalBase*(@dtoPP/100),DECIMAL(18,5)),0);
    SET @baseImponible = IFNULL(CONVERT(@totalBase - @importeDtoPP,DECIMAL(18,5)),0);
	SET @importeIVA = IFNULL(CONVERT(@baseImponible*(@IVA/100),DECIMAL(18,5)),0);
	SET @importeRE = IFNULL(CONVERT(@baseImponible*(@RE/100),DECIMAL(18,5)),0);
	SET @total = IFNULL(@baseImponible + @importeIVA + @importeRE,0);
	
	
	UPDATE linorders
SET 
    SubTotal = @totalBase,
    ImporteDtoC = @importeDtoC,
    ImporteDtoPP = @importeDtoPP,
    BaseImponible = @baseImponible,
    ImporteIVA = @importeIVA,
    ImporteRE = @importeRE,
    Total = @total,
    RE = @RE
WHERE
    NumPed = pedido AND IdlinPed = linea;

IF (@formaPago = 3) THEN
BEGIN
	SELECT IFNULL(PContraReembolso,0),IFNULL(MinimoContraReembolso,0) INTO @Porc,@min FROM payments where IdFormaPago = 3; /*contrarrembolso*/
	
    SELECT IFNULL(SUM(BaseImponible),0) INTO @bi FROM linorders WHERE NumPed = pedido AND CodArticulo != '9999999';
    
    SET @Contra = (IFNULL(@bi,0)*(@Porc/100));
    
    IF (@Contra < @min) THEN 
    	SET @Contra = @min; 
    END IF;
    
   	SET @IVA = 21;
    
    IF (@recli = 1) THEN
        SET @RE = 5.20; 
    ELSE
    	SET @RE = 0; 
    END IF;    
    
    
    IF (SELECT 1 = 1 FROM linorders WHERE NumPed=pedido AND CodArticulo='9999999') THEN
    BEGIN
    	UPDATE linorders SET BaseImponible = @Contra,
        IVA = @IVA, 
        RE = @RE,
        ImporteIVA = IFNULL(CONVERT(@Contra*(@IVA/100),DECIMAL(18,5)),0),
        ImporteRE = IFNULL(CONVERT(@Contra*(@RE/100),DECIMAL(18,5)),0), 
        Total = @Contra + IFNULL(CONVERT(@Contra*(@IVA/100),DECIMAL(18,5)),0) + IFNULL(CONVERT(@Contra*(@RE/100),DECIMAL(18,5)),0)
        WHERE NumPed = pedido AND CodArticulo = '9999999';
        
    END;
    ELSE
    BEGIN
    	SET @ImpIVA = IFNULL(CONVERT(@Contra*(@IVA/100),DECIMAL(18,5)),0);
        SET @ImpREC = IFNULL(CONVERT(@Contra*(@RE/100),DECIMAL(18,5)),0);
        INSERT INTO linorders (NumPed,CodArticulo,Descripcion,Cantidad,BaseImponible,IVA,ImporteIVA,RE,ImporteRE,Total) 
        VALUES(pedido,'9999999','Gastos contrareembolso',1,@Contra,@IVA,@ImpIVA,@RE,@ImpREC,@Contra+@ImpIVA+@ImpREC);
        /*SELECT LAST_INSERT_ID() AS TableID;*/
    END;
    END IF;
END;
END IF;

END