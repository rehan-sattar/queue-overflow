import { Repository } from 'typeorm';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionsService } from '../../questions/questions.service';
import { QuestionComment } from './question-comments.entity';
import { CommentDto } from '../comment.dto';
import { User } from 'src/api/users/users.entity';

@Injectable()
export class QuestionCommentsService {
  @InjectRepository(QuestionComment)
  private readonly questionsCommentsRepo: Repository<QuestionComment>;

  constructor(private readonly questionsService: QuestionsService) {}

  /**
   * getQuestionComment
   */

  public async getQuestionCommentById(questionId: number, commentId: number) {
    const question = await this.questionsService.getQuestionById(questionId);
    const comment = await this.questionsCommentsRepo.findOne({
      where: {
        id: commentId,
        question: {
          id: question.id,
        },
      },
      relations: {
        user: true,
        question: true,
      },
    });
    if (!comment) {
      throw new NotFoundException(
        `The comment with the id ${commentId} not found on question: ${question.id}`,
      );
    }
    return comment;
  }

  /**
   * getQuestionComments
   */

  public async getQuestionComments(
    questionId: number,
  ): Promise<QuestionComment[]> {
    const question = await this.questionsService.getQuestionById(questionId);
    const comments = await this.questionsCommentsRepo.find({
      where: {
        question: {
          id: question.id,
        },
      },
      relations: {
        user: true,
        question: true,
      },
    });
    return comments;
  }

  /**
   * createQuestionComment
   */

  public async createQuestionComment(
    questionId: number,
    commentDto: CommentDto,
    loggedInUser: User,
  ): Promise<QuestionComment> {
    const question = await this.questionsService.getQuestionById(questionId);
    const comment = await this.questionsCommentsRepo.create({
      question,
      user: loggedInUser,
      contents: commentDto.contents,
    });
    return this.questionsCommentsRepo.save(comment);
  }

  /**
   * updateQuestionComment
   */

  public async updateQuestionComment(
    questionId: number,
    commentId: number,
    commentDto: CommentDto,
    loggedInUser: User,
  ): Promise<QuestionComment> {
    const comment = await this.getQuestionCommentById(questionId, commentId);
    if (comment.user.id !== loggedInUser.id) {
      throw new UnauthorizedException();
    }
    comment.contents = commentDto.contents || comment.contents;
    return this.questionsCommentsRepo.save(comment);
  }

  /**
   * deleteQuestionComment
   */

  public async deleteQuestionComment(
    commentId: number,
    loggedInUser: User,
  ): Promise<void> {
    const comment = await this.questionsCommentsRepo.findOne({
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
    await this.questionsCommentsRepo.remove(comment);
  }
}
