import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ length: 100, default: '' })
  title: string;

  @Column({ length: 300, default: '' })
  description: string;

  @Column()
  banner: string;

  @Column()
  discount: number;

  @Column()
  price: number;
}
