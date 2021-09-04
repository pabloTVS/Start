import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class detailproduct {
    @PrimaryColumn() IdArticulo: number;
    @Column() _regular_price: string;
    @Column() _price: string;
    @Column() _sale_price: string;
    @Column() _stock: string;
    @Column() _tax_class: string;
    @Column() refproveedor: string;
    @Column() pcoste: string;
    @Column() _sku: string;
}