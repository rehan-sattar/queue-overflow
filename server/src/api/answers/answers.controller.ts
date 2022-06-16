import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetLoggedInUser } from '../auth/get-logged-in-user.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../users/users.entity';
import { Answer } from './answers.entity';
import { AnswersService } from './answers.service';
import { CreateUpdateAnswerDto } from './dto/create-update-answer.dto';

@Controller('answers')
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  @Get('/:questionId')
  @UseGuards(JwtAuthGuard)
  getAnswers(@Param('questionId') questionId: number): Promise<Answer[]> {
    return this.answersService.getAnswers(questionId);
  }

  @Get('/:questionId/:answerId')
  @UseGuards(JwtAuthGuard)
  getAnswer(
    @Param('questionId') questionId: number,
    @Param('answerId') answerId: number,
  ): Promise<Answer> {
    return this.answersService.getAnswer(questionId, answerId);
  }

  @Post('/:questionId')
  @UseGuards(JwtAuthGuard)
  createAnswer(
    @Param('questionId') questionId: number,
    @Body() createAnswerDto: CreateUpdateAnswerDto,
    @GetLoggedInUser() loggedInUser: User,
  ): Promise<Answer> {
    return this.answersService.createAnswer(
      questionId,
      createAnswerDto,
      loggedInUser,
    );
  }

  @Patch('/:id')
  @UseGuards(JwtAuthGuard)
  updateAnswer(
    @Param('id') answerId: number,
    @Body() updateAnswerDto: CreateUpdateAnswerDto,
    @GetLoggedInUser() loggedInUser: User,
  ): Promise<Answer> {
    return this.answersService.updateAnswer(
      answerId,
      updateAnswerDto,
      loggedInUser,
    );
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  deleteAnswer(
    @Param('id') answerId: number,
    @GetLoggedInUser() loggedInUser: User,
  ): Promise<void> {
    return this.answersService.deleteAnswer(answerId, loggedInUser);
  }
}
