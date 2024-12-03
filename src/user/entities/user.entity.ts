
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cad_user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column({ length: 500 })
  email: string;

  @Column({ length: 500 })
  password: string;
}
