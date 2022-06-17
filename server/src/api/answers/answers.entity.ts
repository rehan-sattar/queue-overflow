import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../users/users.entity';
import { Question } from '../questions/questions.entity';
import { AnswerComment } from '../comments/answer-comments/answer-comments.entity';

@Entity('answers')
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Question, (question) => question.answers)
  question: Question;

  @Column()
  contents: string;

  @OneToMany(() => AnswerComment, (comment) => comment.answer, {
    cascade: true,
  })
  comments: AnswerComment[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
