import { Entity, ManyToOne } from 'typeorm';
import { User } from 'src/api/users/users.entity';
import { CommentBaseEntity } from '../comments-base.entity';
import { Question } from 'src/api/questions/questions.entity';

@Entity('question_comments')
export class QuestionComment extends CommentBaseEntity {
  @ManyToOne(() => User, (user) => user.questionComments, {
    onDelete: 'CASCADE',
  })
  user: User;

  @ManyToOne(() => Question, (question) => question.comments, {
    onDelete: 'CASCADE',
  })
  question: Question;
}
