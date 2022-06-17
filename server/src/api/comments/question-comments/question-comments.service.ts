import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionsService } from '../../questions/questions.service';
import { QuestionComment } from './question-comments.entity';

@Injectable()
export class QuestionCommentsService {
  @InjectRepository(QuestionComment)
  private readonly questionsCommentsRepo: Repository<QuestionComment>;

  constructor(private readonly questionsService: QuestionsService) {}

  /**
   * getQuestionComment
   */

  /**
   * createQuestionComment
   */

  /**
   * getQuestionComments
   */

  /**
   * updateQuestionComment
   */

  /**
   * deleteQuestionComment
   */
}
