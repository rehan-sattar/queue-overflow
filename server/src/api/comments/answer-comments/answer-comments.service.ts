import { Repository } from 'typeorm';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CommentDto } from '../comment.dto';
import { User } from 'src/api/users/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AnswerComment } from './answer-comments.entity';
import { AnswersService } from 'src/api/answers/answers.service';

@Injectable()
export class AnswerCommentsService {
  @InjectRepository(AnswerComment)
  private readonly answerCommentRepo: Repository<AnswerComment>;

  constructor(private readonly answersService: AnswersService) {}

  /**
   * getAnswerComment
   */

  public async getAnswerCommentById(answerId: number, commentId: number) {
    const answer = await this.answersService.getAnswerById(answerId);
    const comment = await this.answerCommentRepo.findOne({
      where: { id: commentId, answer: { id: answer.id } },
      relations: { user: true, answer: true },
    });
    if (!comment) {
      throw new NotFoundException(
        `The comment with the id ${commentId} not found on answer: ${answer.id}`,
      );
    }
    return comment;
  }

  /**
   * getAnswerComments
   */

  public async getAnswerComments(answerId: number): Promise<AnswerComment[]> {
    const answer = await this.answersService.getAnswerById(answerId);
    const comments = await this.answerCommentRepo.find({
      where: { answer: { id: answer.id } },
      relations: { user: true, answer: true },
    });
    return comments;
  }

  /**
   * createAnswerComment
   */

  public async createAnswerComment(
    answerId: number,
    commentDto: CommentDto,
    loggedInUser: User,
  ): Promise<AnswerComment> {
    const answer = await this.answersService.getAnswerById(answerId);
    const comment = await this.answerCommentRepo.create({
      answer,
      user: loggedInUser,
      contents: commentDto.contents,
    });
    return this.answerCommentRepo.save(comment);
  }

  /**
   * updateAnswerComment
   */

  public async updateAnswerComment(
    answerId: number,
    commentId: number,
    commentDto: CommentDto,
    loggedInUser: User,
  ): Promise<AnswerComment> {
    const comment = await this.getAnswerCommentById(answerId, commentId);
    if (comment.user.id !== loggedInUser.id) {
      throw new UnauthorizedException();
    }
    comment.contents = commentDto.contents || comment.contents;
    return this.answerCommentRepo.save(comment);
  }

  /**
   * deleteAnswerComment
   */

  public async deleteAnswerComment(
    commentId: number,
    loggedInUser: User,
  ): Promise<void> {
    const comment = await this.answerCommentRepo.findOne({
      where: { id: commentId },
      relations: { user: true },
    });
    if (!comment) {
      throw new NotFoundException(
        `The comment with id: ${commentId} not found.`,
      );
    }
    if (comment.user.id !== loggedInUser.id) {
      throw new UnauthorizedException();
    }
    await this.answerCommentRepo.remove(comment);
  }
}
