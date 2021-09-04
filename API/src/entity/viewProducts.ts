import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()

export class viewProducts {
    @PrimaryColumn() ID: number;
    @Column() Articulo: string;
    @Column() Url: string;
    @Column() DescLarga: string;
    @Column() DescCorta: string;
    @Column() Estado: string;
    @Column() Precio: string;
    @Column() PrecioRebajado: string;
    @Column() PCoste: string;
    @Column() Stock: string;    
    @Column() Sku: string;
    @Column() IVA: string;
    @Column() PorcIVA: string;
    @Column() refproveedor: string;
    @Column() Imagen: string;
    @Column() Proveedor: string;
    @Column() Categoria: string;
    @Column() Subcategoria: string;
    @Column() IdProveedor: string;
    @Column() IdCategoria: string;
    @Column() IdSubCategoria: string;
}