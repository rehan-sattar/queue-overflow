import { Entity, ManyToOne } from 'typeorm';
import { User } from 'src/api/users/users.entity';
import { Answer } from 'src/api/answers/answers.entity';
import { CommentBaseEntity } from '../comments-base.entity';

@Entity('answer_comments')
export class AnswerComment extends CommentBaseEntity {
  @ManyToOne(() => User, (user) => user.answerComments)
  user: User;

  @ManyToOne(() => Answer, (answer) => answer.comments)
  answer: Answer;
}
