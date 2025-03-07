import { Entity, Column, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Product } from './products.entity';

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  url: string;

  @Column()
  filename: string;

  @Column()
  type: string;

  @OneToOne(() => Product, (product) => product.photo)
  product: Product;
}
