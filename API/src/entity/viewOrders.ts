import { Entity, Column, PrimaryColumn } from 'typeorm';
@Entity()

export class vieworders {
    @PrimaryColumn() NumPed: number;
    @Column("varchar",{length:1}) Serie: string;
    @Column() Fecha: string;
    @Column() FechaEntrega: string;
    @Column("int") CodComercial: number;
    @Column("varchar") Comercial: String;
    @Column("int") CodCli: number;
    @Column("varchar") NombreCliente: String;
    @Column("varchar") DenominacionComercial: String;
    @Column("varchar") Destino: string;
    @Column("varchar") Direccion: string;
    @Column("varchar") Localidad: string;
    @Column("varchar") CodPostal: string;
    @Column("varchar") Provincia: string;
    @Column("decimal",{precision:18.5}) Total: number;
    @Column("decimal",{precision:18.5}) Pagado: number;
    @Column("decimal",{precision:18.5}) Pendiente: number;
    @Column("int",{default:1}) CodFormaPago: number;
    @Column("varchar") DescripcionFormaPago: string;
    @Column("tinyint",{default:1}) CodigoEstado: number;
    @Column("varchar") Estado: string;
    @Column("decimal",{precision:18.2}) PorcComision: number;
    @Column({type:"date"}) SerieFra: string;
    @Column("int") NumFra: number;
    @Column("date") FechaFra: string;
    @Column("int") CodDestino: number;    
    @Column("decimal",{precision:18.2}) DtoPP: number;
    @Column() Observaciones: string;
}