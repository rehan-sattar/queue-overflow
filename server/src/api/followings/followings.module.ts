import { Module } from '@nestjs/common';
import { QuestionFollowingModule } from './question-following/question-following.module';
import { AnswerFollowingModule } from './answer-following/answer-following.module';

@Module({
  imports: [QuestionFollowingModule, AnswerFollowingModule],
})
export class FollowingsModule {}
