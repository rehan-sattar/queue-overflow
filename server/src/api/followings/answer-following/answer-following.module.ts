import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswersModule } from 'src/api/answers/answers.module';
import { UsersModule } from 'src/api/users/users.module';
import { AnswerFollowingController } from './answer-following.controller';
import { AnswerFollowing } from './answer-following.entity';
import { AnswerFollowingService } from './answer-following.service';

@Module({
  imports: [
    UsersModule,
    AnswersModule,
    TypeOrmModule.forFeature([AnswerFollowing]),
  ],
  controllers: [AnswerFollowingController],
  providers: [AnswerFollowingService],
})
export class AnswerFollowingModule {}
