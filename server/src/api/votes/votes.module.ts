import { Module } from '@nestjs/common';
import { QuestionVotesModule } from './question-votes/question-votes.module';

@Module({
  imports: [QuestionVotesModule],
})
export class VotesModule {}
