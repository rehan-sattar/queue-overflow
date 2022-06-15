import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/users.entity';
import { UsersService } from '../users/users.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question } from './questions.entity';

@Injectable()
export class QuestionsService {
  @InjectRepository(Question)
  private readonly questionsRepository: Repository<Question>;

  constructor(private readonly usersService: UsersService) {}

  /**
   * getQuestions
   */
  getQuestions(): Promise<Question[]> {
    return this.questionsRepository.find({
      relations: {
        user: true,
      },
    });
  }

  /**
   * getQuestionById
   */
  async getQuestionById(id: number): Promise<Question> {
    const question = await this.questionsRepository.findOne({
      where: { id },
      relations: { user: true },
    });

    if (!question) {
      throw new NotFoundException(`The question with the id: ${id} not found.`);
    }

    return question;
  }

  /**
   * createQuestion
   */
  async createQuestion(
    userId: number,
    createQuestionDto: CreateQuestionDto,
  ): Promise<Question> {
    const user = await this.usersService.findUserById(userId);

    const { title, description } = createQuestionDto;
    const question = this.questionsRepository.create({
      title,
      description,
      user,
    });

    return this.questionsRepository.save(question);
  }

  /**
   * updateQuestion
   */
  async updateQuestion(
    userId: number,
    questionId: number,
    updateQuestionDto: UpdateQuestionDto,
    loggedInUser: User,
  ): Promise<Question> {
    const question = await this.getQuestionById(questionId);
    if (question.user.id !== userId || loggedInUser.id !== userId) {
      throw new UnauthorizedException();
    }

    const { title, description } = updateQuestionDto;

    question.title = title || question.title;
    question.description = description || question.description;

    return this.questionsRepository.save(question);
  }

  /**
   * deleteQuestion
   */
  async deleteQuestion(questionId: number, loggedInUser: User): Promise<void> {
    const question = await this.getQuestionById(questionId);

    if (question.user.id !== loggedInUser.id) {
      throw new UnauthorizedException();
    }

    await this.questionsRepository.remove(question);
  }

  /**
   * incrementQuestionViewsCount
   */
  async incrementQuestionViewsCount(questionId: number): Promise<void> {
    const question = await this.getQuestionById(questionId);
    question.views = question.views + 1;
    await this.questionsRepository.save(question);
  }
}
