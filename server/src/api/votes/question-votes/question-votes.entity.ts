import { Question } from 'src/api/questions/questions.entity';
import { Entity, ManyToOne } from 'typeorm';
import { Vote } from '../vote.entity';

@Entity('question_votes')
export class QuestionVote extends Vote {
  @ManyToOne(() => Question, (question) => question.votes)
  question: Question;
}
