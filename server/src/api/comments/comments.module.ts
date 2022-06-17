import { Module } from '@nestjs/common';
import { QuestionCommentsModule } from './question-comments/question-comments.module';
import { AnswerCommentsModule } from './answer-comments/answer-comments.module';

@Module({
  imports: [QuestionCommentsModule, AnswerCommentsModule],
})
export class CommentsModule {}
