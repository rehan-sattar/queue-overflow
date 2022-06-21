import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Question } from '../questions/questions.entity';
import { User } from '../users/users.entity';

@Entity('tags')
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => Question)
  @JoinTable()
  question: Question;

  @ManyToMany(() => User)
  @JoinTable()
  user: User;

  @CreateDateColumn()
  createdAt: Date;
}
