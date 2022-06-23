import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { QuestionsModule } from './questions/questions.module';
import { AnswersModule } from './answers/answers.module';
import { CommentsModule } from './comments/comments.module';
import { TagsModule } from './tags/tags.module';
import { VotesModule } from './votes/votes.module';
import { FollowingsModule } from './followings/followings.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    QuestionsModule,
    AnswersModule,
    CommentsModule,
    TagsModule,
    VotesModule,
    FollowingsModule,
  ],
})
export class ApiModule {}
