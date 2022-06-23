import { Answer } from 'src/api/answers/answers.entity';
import { User } from 'src/api/users/users.entity';
import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('answer_following')
export class AnswerFollowing {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.followingAnswers)
  follower: User;

  @ManyToOne(() => Answer, (answer) => answer.followers)
  answer: Answer;

  @CreateDateColumn()
  createdAt: Date;
}
