import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Answer } from './answers.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUpdateAnswerDto } from './dto/create-update-answer.dto';
import { QuestionsService } from '../questions/questions.service';
import { User } from '../users/users.entity';

@Injectable()
export class AnswersService {
  @InjectRepository(Answer)
  private readonly answersRepository: Repository<Answer>;

  constructor(private questionsService: QuestionsService) {}

  /**
   * getAnswers
   */
  public async getAnswers(questionId: number): Promise<Answer[]> {
    // check if the question exist, if not then it will throw not found error.
    await this.questionsService.getQuestionById(questionId);
    return this.answersRepository.find({
      where: { question: { id: questionId } },
      relations: { question: true, user: true },
    });
  }

  /**
   * getAnswer
   */
  public async getAnswer(
    questionId: number,
    answerId: number,
  ): Promise<Answer> {
    const answer = await this.answersRepository.findOne({
      where: { id: answerId, question: { id: questionId } },
      relations: { user: true, question: true },
    });
    if (!answer) throw new NotFoundException(`The answer does not exist.`);
    return answer;
  }

  /**
   * getAnswerById
   */
  public async getAnswerById(answerId: number) {
    const answer = await this.answersRepository.findOne({
      where: { id: answerId },
      relations: { user: true },
    });

    if (!answer) throw new NotFoundException(`The answer does not exist.`);
    return answer;
  }

  /**
   * createAnswer
   */
  public async createAnswer(
    questionId: number,
    createQuestionDto: CreateUpdateAnswerDto,
    loggedInUser: User,
  ): Promise<Answer> {
    const question = await this.questionsService.getQuestionById(questionId);

    const answer = this.answersRepository.create({
      contents: createQuestionDto.contents,
      user: loggedInUser,
      question,
    });

    return this.answersRepository.save(answer);
  }

  /**
   * updateAnswer
   */
  public async updateAnswer(
    answerId: number,
    updateAnswerDto: CreateUpdateAnswerDto,
    loggedInUser: User,
  ): Promise<Answer> {
    const answer = await this.getUserAnswer(answerId, loggedInUser);
    answer.contents = updateAnswerDto.contents;
    return this.answersRepository.save(answer);
  }

  /**
   * deleteAnswer
   */
  public async deleteAnswer(
    answerId: number,
    loggedInUser: User,
  ): Promise<void> {
    const answer = await this.getUserAnswer(answerId, loggedInUser);
    await this.answersRepository.remove(answer);
  }

  private async getUserAnswer(answerId: number, user: User): Promise<Answer> {
    const answer = await this.answersRepository.findOne({
      where: {
        id: answerId,
        user: {
          id: user.id,
        },
      },
    });

    if (!answer) {
      throw new NotFoundException(
        `The answer with the id: ${answer} not found. Are you sure the answer belong to you?`,
      );
    }

    return answer;
  }
}
