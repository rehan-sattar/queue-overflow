import { CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export class Following {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;
}
