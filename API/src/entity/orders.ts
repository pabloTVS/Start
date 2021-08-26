import { Entity, PrimaryGeneratedColumn, Unique, Column, CreateDateColumn } from 'typeorm';
@Entity()
@Unique(['NumPed'])
export class Orders {
    @PrimaryGeneratedColumn() NumPed: number;
    @Column("varchar",{length:1}) Serie: string;
    @CreateDateColumn() Fecha: string;
    @CreateDateColumn() FechaEntrega: string;
    @Column("int") CodCli: number;
    @Column("decimal",{precision:18.2}) DtoPP: number;
    @Column() Observaciones: string;
    @Column("decimal",{precision:18.5}) TotalPedido: number;
    @Column("decimal",{precision:18.5}) TotalPagado: number;
    @Column("decimal",{precision:18.5}) TotalPendiente: number;
    @Column({type:"date"}) SerieFra: string;
    @Column("int") NumFra: number;
    @Column("date") FechaFra: string;
    @Column("int",{default:0}) CodComercial: number;
    @Column("decimal",{precision:18.2}) Comision: number;
    @Column("int") CodDestino: number;
    @Column("tinyint",{default:1}) CodOrdStatus: number;
    @Column("int",{default:1}) CodFormaPago: number;
}

 