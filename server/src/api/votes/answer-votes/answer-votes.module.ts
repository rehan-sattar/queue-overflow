import { Module } from '@nestjs/common';
import { AnswerVotesService } from './answer-votes.service';
import { AnswerVotesController } from './answer-votes.controller';
import { AnswersModule } from 'src/api/answers/answers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerVote } from './answer-votes.entity';

@Module({
  imports: [AnswersModule, TypeOrmModule.forFeature([AnswerVote])],
  providers: [AnswerVotesService],
  controllers: [AnswerVotesController],
})
export class AnswerVotesModule {}
