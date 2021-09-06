import { Entity, Column, PrimaryColumn} from 'typeorm';
@Entity()
export class viewlinesorders {
    @PrimaryColumn() IdLinPed: number;
    @Column("int") NumPed: number;
    @Column("bigint") CodArticulo: number;
    @Column("decimal",{precision:18.5}) PCosto: number;
    @Column() Descripcion: string;
    @Column("decimal",{precision:18.2}) Cantidad: number;
    @Column("decimal",{precision:18.5}) Precio: number;
    @Column("decimal",{precision:18.5}) SubTotal: number;
    @Column("decimal",{precision:18.2}) DtoC: number;
    @Column("decimal",{precision:18.5}) ImporteDtoC: number;
    @Column("decimal",{precision:18.2}) DtoPP: number;
    @Column("decimal",{precision:18.5}) BaseImponible: number;
    @Column("decimal",{precision:18.2}) IVA: number;
    @Column("decimal",{precision:18.5}) ImporteIVA: number;
    @Column("decimal",{precision:18.2}) RE: number;
    @Column("decimal",{precision:18.5}) ImporteRE: number;
    @Column("decimal",{precision:18.5}) Total: number;
    @Column("int") CodOferta: number;
    @Column("int") LinOferta: number;
    @Column("nvarchar") Imagen: string;
}