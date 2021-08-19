import { getRepository } from 'typeorm'
import { Request, Response } from 'express'


import { linorders } from '../entity/linOrders'

export class LinesOrdersController {
    static getLinOrder = async (req: Request, res: Response) => {
        const {NumPedido} = req.params;
        const linOrderRepository = getRepository(linorders);
    
        let linOrder: linorders[];
    
        try {
            linOrder = await linOrderRepository.createQueryBuilder().
            select(["lin.IdLinPed","lin.NumPed","lin.CodArticulo","lin.PCosto","lin.Descripcion","lin.Cantidad","lin.Precio"
            ,"lin.Precio","lin.SubTotal","lin.DtoC","lin.importeDtoC","lin.BaseImponible","lin.IVA","lin.ImporteIVA","lin.RE","lin.ImporteRE",
            "lin.Total","lin.CodOferta","lin.LinOferta"]).
            from(linorders,"lin").where("lin.NumPed =:ped ",{ped: NumPedido}).getMany();
    
            linOrder ? res.send(linOrder) :  res.status(404).json({ message: 'No se ha devuelto ningún valor.' });
    
        } catch (e) {
                res.status(404).json({ message: e.message});
        }
    } 

}

export default LinesOrdersController