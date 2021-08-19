import { getRepository } from 'typeorm';
import { Request, Response, text } from 'express';
import { validate } from 'class-validator';

import { Orders } from '../entity/orders'


export class OrdersController {
    //obtiene las cabeceras.
    static getAllOrders = async (req: Request, res: Response) => {
        const {CodComercial,Role} = req.params;
        const ordersRepository = getRepository(Orders);
  
        if (Role === 'Admin') //Si eres Admin lo muestra siempre.
        {
            let orders:any;
            try {
            orders = await ordersRepository.find();
                res.send(orders);
    
            } catch (e) {
                res.status(404).json({ message: e.message});
            }
    
        }   
        else {
            let orders : Orders[];
                
            try {
            orders = await ordersRepository.createQueryBuilder().
            select(["ord.NumPed","ord.Serie","ord.Fecha","ord.FechaEntrega","ord.CodCli","ord.DtoPP","ord.Observaciones","ord.TotalPedido",
            "ord.TotalPagado","ord.TotalPendiente","ord.NumFra","ord.SerieFra","ord.FechaFra","ord.CodComercial","ord.Comision","ord.CodDestino","ord.CodOrdStatus"]).
            from(Orders,"ord").where("ord.CodComercial =:com ",{com: CodComercial}).getMany();

            orders ? res.send(orders) :  res.status(404).json({ message: 'No se ha devuelto ningún valor.' });
            }
            catch (e) {
            res.status(400).json({message: e.message })
            } 
        }
    }
  //only order
    static getById = async (req: Request, res: Response) => {
        const {NumPedido} = req.params;
        const orderRepository = getRepository(Orders);
        let orders : Orders[];
                
        try {
        orders = await orderRepository.createQueryBuilder().
        select(["ord.NumPed","ord.Serie","ord.Fecha","ord.FechaEntrega","ord.CodCli","ord.DtoPP","ord.Observaciones","ord.TotalPedido",
        "ord.TotalPagado","ord.TotalPendiente","ord.NumFra","ord.SerieFra","ord.FechaFra","ord.CodComercial","ord.Comision","ord.CodDestino","ord.CodOrdStatus"]).
        from(Orders,"ord").where("ord.NumPed =:ped ",{ped: NumPedido}).getMany();

        orders ? res.send(orders) :  res.status(404).json({ message: 'No se ha devuelto ningún valor.' });
        }
        catch (e) {
        res.status(400).json({message: e.message })
        }
  }
  //New order
  static new = async (req: Request, res: Response) => {
    const {Serie,Fecha,FechaEntrega,CodCli,DtoPP,Observaciones,CodComercial,Comision,CodDestino,CodOrdStatus} = req.body;
    const order = new Orders();

    order.Serie = Serie;
    order.Fecha = Fecha;
    order.FechaEntrega = FechaEntrega;
    order.CodCli = CodCli;
    order.DtoPP = DtoPP;
    order.Observaciones = Observaciones;
    order.CodComercial = CodComercial;
    order.Comision = Comision;
    order.CodDestino = CodDestino;
    order.CodOrdStatus = CodOrdStatus;

    //ejecuto validaciones..
    const validationOpt = { validationError: { target: false, value: false } };
    const errors = await validate(order, validationOpt) ;
    if (errors.length > 0) {return res.status(400).json(errors);}

    //Try save order
    const orderRepository = getRepository(Orders);
    try {
        await orderRepository.save(order);
    } catch (e) {
        return res.status(409).json(e.message);        
    }
    res.status(201).json({message: 'Pedido creado correctamente'});
  }
  //Delete order
  static delete = async (req: Request, res: Response) => {
    const { NumPedido } = req.params;
    const ordersRepository = getRepository(Orders);
    let order: Orders;

    try {
      order = await ordersRepository.findOneOrFail(NumPedido);
    } catch (e) {
      return res.status(404).json({ message: 'Pedido inexistente.' });
    }

    // Remove customer
    try {
      await ordersRepository.delete(NumPedido);        
    } catch (e) {
      return res.status(409).json(e.message);
    }

    res.status(201).json({ message: 'Pedido borrado' });
  }
}

export default OrdersController;