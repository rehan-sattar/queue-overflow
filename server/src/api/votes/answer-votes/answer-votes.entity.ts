import { Answer } from 'src/api/answers/answers.entity';
import { Entity, ManyToOne } from 'typeorm';
import { Vote } from '../vote.entity';

@Entity('answer_votes')
export class AnswerVote extends Vote {
  @ManyToOne(() => Answer, (answer) => answer.votes)
  answer: Answer;
}
