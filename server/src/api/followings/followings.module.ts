import { Module } from '@nestjs/common';
import { QuestionFollowingModule } from './question-following/question-following.module';

@Module({
  imports: [QuestionFollowingModule],
})
export class FollowingsModule {}
