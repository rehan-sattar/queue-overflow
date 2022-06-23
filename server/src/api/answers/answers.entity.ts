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
import { AnswerVote } from '../votes/answer-votes/answer-votes.entity';
import { AnswerFollowing } from '../followings/answer-following/answer-following.entity';

@Entity('answers')
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Question, (question) => question.answers, {
    onDelete: 'CASCADE',
  })
  question: Question;

  @Column()
  contents: string;

  @OneToMany(() => AnswerComment, (comment) => comment.answer, {
    onDelete: 'CASCADE',
  })
  comments: AnswerComment[];

  @OneToMany(() => AnswerVote, (vote) => vote.answer)
  votes: AnswerVote[];

  @OneToMany(() => AnswerFollowing, (following) => following.answer, {
    onDelete: 'CASCADE',
  })
  followers: AnswerFollowing[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
