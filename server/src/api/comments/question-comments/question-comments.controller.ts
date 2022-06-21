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
import { GetLoggedInUser } from 'src/api/auth/get-logged-in-user.decorator';
import { JwtAuthGuard } from 'src/api/auth/jwt-auth.guard';
import { User } from 'src/api/users/users.entity';
import { CommentDto } from '../comment.dto';
import { QuestionComment } from './question-comments.entity';
import { QuestionCommentsService } from './question-comments.service';

@Controller('question-comments')
export class QuestionCommentsController {
  constructor(
    private readonly questionCommentService: QuestionCommentsService,
  ) {}

  @Get('/:questionId/:commentId')
  @UseGuards(JwtAuthGuard)
  public getQuestionCommentById(
    @Param('questionId') questionId: number,
    @Param('commentId') commentId: number,
  ): Promise<QuestionComment> {
    return this.questionCommentService.getQuestionCommentById(
      questionId,
      commentId,
    );
  }

  @Get('/:questionId/')
  @UseGuards(JwtAuthGuard)
  public getQuestionComments(
    @Param('questionId') questionId: number,
  ): Promise<QuestionComment[]> {
    return this.questionCommentService.getQuestionComments(questionId);
  }

  @Post('/:questionId')
  @UseGuards(JwtAuthGuard)
  public createQuestionComment(
    @Param('questionId') questionId: number,
    @Body() commentDto: CommentDto,
    @GetLoggedInUser() loggedInUser: User,
  ): Promise<QuestionComment> {
    return this.questionCommentService.createQuestionComment(
      questionId,
      commentDto,
      loggedInUser,
    );
  }

  @Patch('/:questionId/:commentId')
  @UseGuards(JwtAuthGuard)
  public updateQuestionComment(
    @Param('questionId') questionId: number,
    @Param('commentId') commentId: number,
    @Body() commentDto: CommentDto,
    @GetLoggedInUser() loggedInUser: User,
  ): Promise<QuestionComment> {
    return this.questionCommentService.updateQuestionComment(
      questionId,
      commentId,
      commentDto,
      loggedInUser,
    );
  }

  @Delete('/:commentId')
  @UseGuards(JwtAuthGuard)
  public deleteComment(
    @Param('commentId') commentId: number,
    @GetLoggedInUser() loggedInUser: User,
  ): Promise<void> {
    return this.questionCommentService.deleteQuestionComment(
      commentId,
      loggedInUser,
    );
  }
}
