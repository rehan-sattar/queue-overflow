import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionComment } from './question-comments.entity';
import { QuestionsModule } from 'src/api/questions/questions.module';
import { QuestionCommentsService } from './question-comments.service';
import { QuestionCommentsController } from './question-comments.controller';

@Module({
  imports: [QuestionsModule, TypeOrmModule.forFeature([QuestionComment])],
  providers: [QuestionCommentsService],
  controllers: [QuestionCommentsController],
})
export class QuestionCommentsModule {}
