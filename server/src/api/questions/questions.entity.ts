import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Answer } from '../answers/answers.entity';
import { User } from '../users/users.entity';
import { QuestionComment } from '../comments/question-comments/question-comments.entity';

@Entity('questions')
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  title: string;

  @Column({ length: 1000 })
  description: string;

  @Column({ default: 0 })
  views: number;

  // Relationships //

  @ManyToOne(() => User, (user) => user.questions)
  user: User;

  @OneToMany(() => Answer, (answer) => answer.question)
  answers: Answer[];

  @OneToMany(() => QuestionComment, (comment) => comment.question, {})
  comments: QuestionComment[];

  // Timestamps //
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
