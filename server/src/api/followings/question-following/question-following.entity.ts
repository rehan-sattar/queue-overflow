import { Question } from 'src/api/questions/questions.entity';
import { User } from 'src/api/users/users.entity';
import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('question_following')
export class QuestionFollowing {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.followingQuestions)
  follower: User;

  @ManyToOne(() => Question, (question) => question.followers)
  question: Question;

  @CreateDateColumn()
  createdAt: Date;
}
