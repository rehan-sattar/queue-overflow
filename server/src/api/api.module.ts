import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TagsModule } from './tags/tags.module';
import { UsersModule } from './users/users.module';
import { VotesModule } from './votes/votes.module';
import { BadgesModule } from './badges/badges.module';
import { AnswersModule } from './answers/answers.module';
import { CommentsModule } from './comments/comments.module';
import { QuestionsModule } from './questions/questions.module';
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
    BadgesModule,
  ],
})
export class ApiModule {}
