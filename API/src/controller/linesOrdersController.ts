import { getRepository } from 'typeorm'
import { Request, Response } from 'express'


import { linorders } from '../entity/linOrders'
import { viewlinesorders } from '../entity/viewLinesOrders'
import { validate } from 'class-validator';

export class LinesOrdersController {
    static getLinOrder = async (req: Request, res: Response) => {
        const {NumPedido} = req.params;
        const linOrderRepository = getRepository(linorders);

        let linOrder: viewlinesorders[];

        try {
            linOrder = await linOrderRepository.createQueryBuilder().
            select(["lin.IdLinPed","lin.NumPed","lin.CodArticulo","lin.PCosto","lin.Descripcion","lin.Cantidad","lin.Precio"
            ,"lin.DtoPP","lin.SubTotal","lin.DtoC","lin.importeDtoC","lin.BaseImponible","lin.IVA","lin.ImporteIVA","lin.RE","lin.ImporteRE",
            "lin.Total","lin.CodOferta","lin.LinOferta","lin.Imagen"]).
            from(viewlinesorders,"lin").where("lin.NumPed =:ped ",{ped: NumPedido}).orderBy("lin.CodArticulo,lin.Descripcion").getMany();

            linOrder ? res.send(linOrder) :  res.status(404).json({ message: 'No se ha devuelto ningún valor.' });

        } catch (e) {
                res.status(404).json({ message: e.message});
        }
    }
    //new line
    static new = async (req: Request, res: Response) => {
        const {NumPed,CodArticulo,PCosto,Descripcion,Cantidad,Precio,DtoC,DtoPP,PorcIVA,RE,CodOferta,LinOferta} = req.body;
        const line = new linorders;
        let newLine: linorders;

        line.NumPed = NumPed;
        line.CodArticulo = CodArticulo;
        line.PCosto = PCosto;
        line.Descripcion = Descripcion;
        line.Cantidad = Cantidad;
        line.Precio = Precio;
        line.DtoC = DtoC;
        line.DtoPP = DtoPP;
        line.IVA = PorcIVA;
        line.RE = RE;
        line.CodOferta = CodOferta;
        line.LinOferta = LinOferta;

        //ejecuto validaciones..
        const validationOpt = { validationError: { target: false, value: false } };
        const errors = await validate(linorders, validationOpt) ;
        if (errors.length > 0) {return res.status(400).json(errors);}

        const linorderRepository = getRepository(linorders);

        //grabo la nueva linea
        try {
            newLine = await linorderRepository.save(line);
            //const newLin = await linorderRepository.findOneOrFail(line.IdLinPed);
            //res.status(201).json({line,newLin});
        } catch (e) {
            return res.status(409).json(e.message);
        }
        //Cálculo línea
        try {
            await linorderRepository.query('CALL pa_CalculaLinPed(?, ?)', [line.NumPed, line.IdLinPed]);
        } catch (e) {
            return res.status(409).json(e.message);
        }
        //Cálculo pedido
        try {
            await linorderRepository.query('CALL pa_CalculaPedido (?)',[line.NumPed]);
        } catch (e) {
            return res.status(409).json(e.message);
        }
        res.send(newLine);
        //res.status(201).json({message: 'Línea añadida correctamente'});
    };

    static delete = async (req: Request, res: Response) => {
        const { IdLinPed,NumPedido } = req.params;
        const linorderRepository = getRepository(linorders);
        let lines: linorders;

        try {
          lines = await linorderRepository.findOneOrFail(IdLinPed);

        } catch (e) {
          return res.status(404).json({ message: 'Línea inexistente.' });
        }
        //res.status(201).json(lines);

        // Remove line
        try {
          await linorderRepository.delete(IdLinPed);
        } catch (e) {
          return res.status(409).json(e.message);
        }
          //Cálculo pedido
        try {
            await linorderRepository.query('CALL pa_CalculaPedido (?)',[NumPedido]);
        } catch (e) {
            return res.status(409).json(e.message);
        }
        res.status(201).json({ message: 'Línea borrada' });
      };


}

export default LinesOrdersController
