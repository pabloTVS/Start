import internal = require('node:stream');
import { Entity, PrimaryGeneratedColumn, Unique, Column, CreateDateColumn, Double} from 'typeorm';
@Entity()
@Unique(['IdCliente'])
export class Customers {
    @PrimaryGeneratedColumn() IdCliente: number;
    @Column() Nombre: string;
    @Column() NombreComercial: string;
    @CreateDateColumn() FechaAlta: Date;
    @Column() DNINIF: string;
    @Column() Telefono1: string;
    @Column() Email1: string;
    @Column() Email2: string;
    @Column() Email3: string;
    @Column() Fax1: string;
    @Column() Movil1: string;
    @Column() CodFormaPago: number;
    @Column() RE: number;
    @Column() DtoPP: number;
    @Column() DtoComercial: number;
    @Column() CodPostal: string;
    @Column() Localidad: string;
    @Column() Provincia: string;
    @Column() Direccion: string;
    @Column() Entidad: string;
    @Column() Oficina: string;
    @Column() DC: string;
    @Column() Cuenta: string;
    @Column() IBAN: string;
    @Column() BICSWIFT: string;
    @Column() Observaciones: string;
    @Column() CodComercial: number;
    @Column() EstadoCliente: number;
}
