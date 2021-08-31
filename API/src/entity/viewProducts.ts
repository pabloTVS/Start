import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()

export class viewProducts {
    @PrimaryColumn() ID: number;
    @Column() Articulo: string;
    @Column() Precio: number;
    @Column() PrecioRebajado: number;
    @Column() Stock: number;    
    @Column() Sku: string;
    @Column() IVA: number;
    @Column() RefProveedor: string;
    @Column() PCoste: number;
    @Column() Imagen: string;
    @Column() Proveedor: string;
    @Column() Categoria: string;
    @Column() Subcategoria: string;
}