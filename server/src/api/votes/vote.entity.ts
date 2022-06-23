import { User } from 'src/api/users/users.entity';
import {
  CreateDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class Vote {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  voter: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
