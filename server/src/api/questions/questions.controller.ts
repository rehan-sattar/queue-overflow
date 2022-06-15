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
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question } from './questions.entity';
import { QuestionsService } from './questions.service';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  /**
   * getAllQuestions
   */
  @Get('/')
  @UseGuards(JwtAuthGuard)
  public getQuestions(): Promise<Question[]> {
    return this.questionsService.getQuestions();
  }

  /**
   * getQuestionById
   */
  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  public getQuestionById(@Param('id') id: number): Promise<Question> {
    return this.questionsService.getQuestionById(id);
  }

  /**
   * createQuestion
   */
  @Post('/:userId')
  @UseGuards(JwtAuthGuard)
  public createQuestion(
    @Param('userId') userId: number,
    @Body() createQuestionDto: CreateQuestionDto,
  ): Promise<Question> {
    return this.questionsService.createQuestion(userId, createQuestionDto);
  }

  /**
   * updateQuestion
   */
  @Patch('/:userId/:id')
  @UseGuards(JwtAuthGuard)
  public updateQuestion(
    @Param('userId') userId: number,
    @Param('id') questionId: number,
    @Body() updateQuestionDto: UpdateQuestionDto,
    @GetLoggedInUser() loggedInUser: User,
  ): Promise<Question> {
    return this.questionsService.updateQuestion(
      userId,
      questionId,
      updateQuestionDto,
      loggedInUser,
    );
  }

  /**
   * deleteQuestion
   */
  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  public deleteQuestion(
    @Param('id') questionId: number,
    @GetLoggedInUser() loggedInUser: User,
  ): Promise<void> {
    return this.questionsService.deleteQuestion(questionId, loggedInUser);
  }
}
