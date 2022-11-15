import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../users/users.entity';
import { Tag } from '../tags/tags-base.entity';
import { Answer } from '../answers/answers.entity';
import { QuestionComment } from '../comments/question-comments/question-comments.entity';
import { QuestionVote } from '../votes/question-votes/question-votes.entity';
import { QuestionFollowing } from '../followings/question-following/question-following.entity';

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

  @ManyToMany(() => Tag)
  @JoinTable({ name: 'question_tags' })
  tags: Tag[];

  @OneToMany(() => QuestionVote, (vote) => vote.question, {
    onDelete: 'CASCADE',
  })
  votes: QuestionVote[];

  @OneToMany(() => QuestionFollowing, (following) => following.question, {
    onDelete: 'CASCADE',
  })
  followers: QuestionFollowing[];

  // Timestamps //
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
