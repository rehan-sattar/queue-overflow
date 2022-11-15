import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/api/users/users.module';
import { QuestionFollowing } from './question-following.entity';
import { QuestionsModule } from 'src/api/questions/questions.module';
import { QuestionFollowingService } from './question-following.service';
import { QuestionFollowingController } from './question-following.controller';

@Module({
  imports: [
    UsersModule,
    QuestionsModule,
    TypeOrmModule.forFeature([QuestionFollowing]),
  ],
  controllers: [QuestionFollowingController],
  providers: [QuestionFollowingService],
})
export class QuestionFollowingModule {}
