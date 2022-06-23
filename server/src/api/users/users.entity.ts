import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Tag } from '../tags/tags-base.entity';
import { Question } from '../questions/questions.entity';
import { AnswerComment } from '../comments/answer-comments/answer-comments.entity';
import { QuestionComment } from '../comments/question-comments/question-comments.entity';
import { QuestionFollowing } from '../followings/question-following/question-following.entity';
import { AnswerFollowing } from '../followings/answer-following/answer-following.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ length: 30, nullable: true })
  username: string;

  @Column({ length: 400, nullable: true })
  bio?: string;

  @Column({ nullable: true })
  profilePhoto?: string;

  @Column({ nullable: true })
  location?: string;

  @Column({ nullable: true })
  website?: string;

  @Column({ nullable: true })
  twitterHandle?: string;

  @Column({ nullable: true })
  githubHandle?: string;

  @OneToMany(() => Question, (question) => question.user, {
    cascade: true,
  })
  questions: Question[];

  @OneToMany(() => AnswerComment, (comment) => comment.answer, {
    cascade: true,
  })
  answerComments: AnswerComment[];

  @OneToMany(() => QuestionComment, (comment) => comment.user, {
    cascade: true,
  })
  questionComments: QuestionComment[];

  @ManyToMany(() => Tag)
  @JoinTable({ name: 'user_tags' })
  tags: Tag[];

  @OneToMany(() => QuestionFollowing, (following) => following.follower)
  followingQuestions: QuestionFollowing[];

  @OneToMany(() => AnswerFollowing, (following) => following.follower)
  followingAnswers: AnswerFollowing[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
