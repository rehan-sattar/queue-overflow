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
import { CommentDto } from '../comment.dto';
import { User } from 'src/api/users/users.entity';
import { AnswerComment } from './answer-comments.entity';
import { JwtAuthGuard } from 'src/api/auth/jwt-auth.guard';
import { AnswerCommentsService } from './answer-comments.service';
import { GetLoggedInUser } from 'src/api/auth/get-logged-in-user.decorator';

@Controller('answer-comments')
export class AnswerCommentsController {
  constructor(private readonly answersCommentService: AnswerCommentsService) {}

  @Get('/:answerId/:commentId')
  @UseGuards(JwtAuthGuard)
  public getAnswerCommentById(
    @Param('answerId') answerId: number,
    @Param('commentId') commentId: number,
  ): Promise<AnswerComment> {
    return this.answersCommentService.getAnswerCommentById(answerId, commentId);
  }

  @Get('/:answerId')
  @UseGuards(JwtAuthGuard)
  public getAnswerComments(
    @Param('answerId') answerId: number,
  ): Promise<AnswerComment[]> {
    return this.answersCommentService.getAnswerComments(answerId);
  }

  @Post('/:answerId')
  @UseGuards(JwtAuthGuard)
  public createAnswerComment(
    @Param('answerId') answerId: number,
    @Body() commentDto: CommentDto,
    @GetLoggedInUser() loggedInUser: User,
  ): Promise<AnswerComment> {
    return this.answersCommentService.createAnswerComment(
      answerId,
      commentDto,
      loggedInUser,
    );
  }

  @Patch('/:answerId/:commentId')
  @UseGuards(JwtAuthGuard)
  public updateAnswerComment(
    @Param('answerId') answerId: number,
    @Param('commentId') commentId: number,
    @Body() commentDto: CommentDto,
    @GetLoggedInUser() loggedInUser: User,
  ): Promise<AnswerComment> {
    return this.answersCommentService.updateAnswerComment(
      answerId,
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
    return this.answersCommentService.deleteAnswerComment(
      commentId,
      loggedInUser,
    );
  }
}
