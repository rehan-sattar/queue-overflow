import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AnswersService } from 'src/api/answers/answers.service';
import { User } from 'src/api/users/users.entity';
import { Repository } from 'typeorm';
import { AnswerVote } from './answer-votes.entity';

@Injectable()
export class AnswerVotesService {
  @InjectRepository(AnswerVote)
  private readonly answerVotesRepository: Repository<AnswerVote>;

  constructor(private readonly answerService: AnswersService) {}

  /**
   * voteAnswer
   */
  public async voteAnswer(answerId: number, loggedInUser: User): Promise<void> {
    const answer = await this.answerService.getAnswerById(answerId);
    if (answer.user.id === loggedInUser.id) {
      throw new HttpException(
        `You can not vote to your own answer`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const existingVote = await this.answerVotesRepository.findOne({
      where: { voter: { id: loggedInUser.id }, answer: { id: answer.id } },
    });
    if (existingVote) {
      await this.answerVotesRepository.remove(existingVote);
      return;
    }
    const newVote = this.answerVotesRepository.create({
      voter: loggedInUser,
      answer,
    });
    await this.answerVotesRepository.save(newVote);
    return;
  }
}
