import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerComment } from './answer-comments.entity';
import { AnswersModule } from 'src/api/answers/answers.module';
import { AnswerCommentsService } from './answer-comments.service';
import { AnswerCommentsController } from './answer-comments.controller';

@Module({
  imports: [AnswersModule, TypeOrmModule.forFeature([AnswerComment])],
  controllers: [AnswerCommentsController],
  providers: [AnswerCommentsService],
})
export class AnswerCommentsModule {}
