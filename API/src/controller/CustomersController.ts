import { getRepository } from 'typeorm';
import { Request, Response, text } from 'express';
import { validate } from 'class-validator';

import { Customers  } from '../entity/Customers';

export class CustomerController {
    static getAllCustomer = async (req: Request, res: Response) => {
        const {CodComercial,Role} = req.params;
        const customerRepository = getRepository(Customers);
        
        if (Role === 'Admin') //Si eres Admin lo muestra siempre.
        {
          let customer:any;
          try {
           customer = await customerRepository.find();
            res.send(customer);
  
          } catch (e) {
            res.status(404).json({ message: e.message});
          }
  
      }   
      else {
        let customer : Customers[];
            
        try {
          customer = await customerRepository.createQueryBuilder().
          select(["cust.IdCliente","cust.Nombre","cust.NombreComercial","cust.FechaAlta","cust.DNINIF","cust.Telefono1","cust.Email1","cust.Email2",
          "cust.Email3","cust.Fax1","cust.Movil1","cust.CodFormaPago","cust.RE","cust.DtoPP","cust.DtoComercial","cust.CodPostal","cust.Localidad",
          "cust.Provincia","cust.Direccion","cust.Entidad","cust.Oficina","cust.DC","cust.Cuenta","cust.IBAN","cust.BICSWIFT","cust.CodComercial","cust.EstadoCliente"]).
          from(Customers,"cust").where("cust.CodComercial =:com ",{com: CodComercial}).getMany();

          customer ? res.send(customer) :  res.status(404).json({ message: 'No se ha devuelto ningún valor.' });
        }
        catch (e) {
          res.status(400).json({message: e.message })
        } 
  }
    }

  //only customer
    static getById = async (req: Request, res: Response) => {
      const {IdCliente} = req.params;
      const customerRepository = getRepository(Customers);
      let  customer:Customers;
      try {
        customer = await customerRepository.findOneOrFail(IdCliente);
        res.send(customer);
      } catch (e) {
          res.status(404).json({message: 'Cliente no encontrado.'});
      }
    }

    //new customer
    static new = async (req: Request, res: Response) => {
      const {Nombre,NombreComercial,DNINIF,Telefono1,Email1,Email2,Email3,Fax1,Movil1,CodFormaPago,RE,DtoPP,DtoComercial,CodPostal,Localidad,Provincia,Direccion,Entidad,Oficina,DC,Cuenta,IBAN,BICSWIFT,Observaciones,CodComercial,EstadoCliente} = req.body;
      const customer = new Customers();

      customer.Nombre = Nombre;
      customer.NombreComercial = NombreComercial;
      customer.DNINIF = DNINIF;
      customer.Direccion = Direccion;
      customer.DtoComercial = DtoComercial;
      customer.DtoPP = DtoPP;
      customer.Email1 = Email1;
      customer.Email2 = Email2;
      customer.Email3 = Email3;
      customer.Entidad = Entidad;
      customer.Fax1 = Fax1;
      customer.IBAN = IBAN;
      customer.Localidad = Localidad;
      customer.Movil1 = Movil1;
      customer.Observaciones = Observaciones;
      customer.Telefono1 = Telefono1;
      customer.CodFormaPago = CodFormaPago;
      customer.RE = RE;
      customer.CodPostal = CodPostal;
      customer.Provincia = Provincia;
      customer.Oficina = Oficina;
      customer.DC = DC;
      customer.Cuenta = Cuenta;
      customer.BICSWIFT = BICSWIFT;
      customer.CodComercial = CodComercial;
      customer.EstadoCliente = EstadoCliente;

      //ejecuto validaciones..
      const validationOpt = { validationError: { target: false, value: false } };
      const errors = await validate(customer, validationOpt) ;

      if (errors.length > 0) {
        return res.status(400).json(errors);
      }

      //Try save customer
      const customerRepository = getRepository(Customers);
      try {
          await customerRepository.save(customer);
      }
      catch (e) {
        return res.status(409).json(e.message);
        }
        res.status(201).json({ message: 'Cliente creado correctamente.' });
    }

    //update
    static edit = async (req: Request, res: Response) => {

      const {IdCliente} = req.params;
      const {Nombre,NombreComercial,DNINIF,Telefono1,Email1,Email2,Email3,Fax1,Movil1,CodFormaPago,RE,DtoPP,DtoComercial,CodPostal,Localidad,Provincia,Direccion,Entidad,Oficina,DC,Cuenta,IBAN,BICSWIFT,Observaciones,CodComercial,EstadoCliente} = req.body;

      const customerRepository = getRepository(Customers);
      let customer:Customers;
      //comprobamos customer
      try {
        customer = await customerRepository.findOneOrFail(IdCliente);

        customer.Nombre = Nombre;
        customer.NombreComercial = NombreComercial;
        customer.DNINIF = DNINIF;
        customer.Direccion = Direccion;
        customer.DtoComercial = DtoComercial;
        customer.DtoPP = DtoPP;
        customer.Email1 = Email1;
        customer.Email2 = Email2;
        customer.Email3 = Email3;
        customer.Entidad = Entidad;
        customer.Fax1 = Fax1;
        customer.IBAN = IBAN;
        customer.Localidad = Localidad;
        customer.Movil1 = Movil1;
        customer.Observaciones = Observaciones;
        customer.Telefono1 = Telefono1;
        customer.CodFormaPago = CodFormaPago;
        customer.RE = RE;
        customer.CodPostal = CodPostal;
        customer.Provincia = Provincia;
        customer.Oficina = Oficina;
        customer.DC = DC;
        customer.Cuenta = Cuenta;
        customer.BICSWIFT = BICSWIFT;
        customer.CodComercial = CodComercial;
        customer.EstadoCliente = EstadoCliente;

      } catch (e) {
        res.status(404).json({ message: 'No se ha devuelto ningún cliente.' });
      }
      //ejecuto validaciones..
      const validationOpt = { validationError: { target: false, value: false } };
      const errors = await validate(customer, validationOpt) ;

      if (errors.length > 0) {
        return res.status(400).json(errors);
      }
    //Try save customer
      try {
        await customerRepository.save(customer);
      } catch (e) {
        return res.status(409).json({ message: 'Error guardando cliente.' });
      }
      res.status(201).json({ message: 'Cliente guardado correctamente.' });
    }

    static delete = async (req: Request, res: Response) => {
      const { IdCliente } = req.params;
      const customerRepository = getRepository(Customers);
      let customer: Customers;

      try {
        customer = await customerRepository.findOneOrFail(IdCliente);
      } catch (e) {
        return res.status(404).json({ message: 'Cliente inexistente.' });
      }

      // Remove customer
      try {
        await customerRepository.delete(IdCliente);        
      } catch (e) {
        return res.status(409).json(e.message);
      }

      res.status(201).json({ message: ' Cliente borrado' });
    };
  
}

export default CustomerController;
