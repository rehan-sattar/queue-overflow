import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionsModule } from 'src/api/questions/questions.module';
import { UsersModule } from 'src/api/users/users.module';
import { QuestionVotesController } from './question-votes.controller';
import { QuestionVote } from './question-votes.entity';
import { QuestionVotesService } from './question-votes.service';

@Module({
  imports: [
    UsersModule,
    QuestionsModule,
    TypeOrmModule.forFeature([QuestionVote]),
  ],
  controllers: [QuestionVotesController],
  providers: [QuestionVotesService],
})
export class QuestionVotesModule {}
