import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Photo } from './photo.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ length: 100, default: '' })
  title: string;

  @Column({ length: 300, default: '' })
  description: string;

  @Column()
  discount: number;

  @Column()
  price: number;

  @OneToOne(() => Photo, (photo) => photo.product, {
    cascade: true,
  })
  @JoinColumn()
  photo: Photo;
}
