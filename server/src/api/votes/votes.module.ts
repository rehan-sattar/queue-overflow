import { Module } from '@nestjs/common';
import { QuestionVotesModule } from './question-votes/question-votes.module';
import { AnswerVotesModule } from './answer-votes/answer-votes.module';

@Module({
  imports: [QuestionVotesModule, AnswerVotesModule],
})
export class VotesModule {}
