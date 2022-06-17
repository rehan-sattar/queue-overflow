import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Answer } from './answers.entity';
import { AnswersService } from './answers.service';
import { UsersModule } from '../users/users.module';
import { AnswersController } from './answers.controller';
import { QuestionsModule } from '../questions/questions.module';

@Module({
  imports: [QuestionsModule, UsersModule, TypeOrmModule.forFeature([Answer])],
  controllers: [AnswersController],
  providers: [AnswersService],
  exports: [AnswersService],
})
export class AnswersModule {}
