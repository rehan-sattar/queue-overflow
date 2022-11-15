import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionsService } from 'src/api/questions/questions.service';
import { User } from 'src/api/users/users.entity';
import { Repository } from 'typeorm';
import { QuestionVote } from './question-votes.entity';

@Injectable()
export class QuestionVotesService {
  @InjectRepository(QuestionVote)
  private readonly questionVotes: Repository<QuestionVote>;

  constructor(private readonly questionsService: QuestionsService) {}

  /**
   * voteQuestion
   */
  public async voteQuestion(
    questionId: number,
    loggedInUser: User,
  ): Promise<void> {
    const question = await this.questionsService.getQuestionById(questionId);
    if (question.user.id === loggedInUser.id) {
      throw new HttpException(
        `You can not vote to your own question`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const existingVote = await this.questionVotes.findOne({
      where: { voter: { id: loggedInUser.id }, question: { id: question.id } },
    });
    if (existingVote) {
      await this.questionVotes.remove(existingVote);
      return;
    }
    const newVote = this.questionVotes.create({
      voter: loggedInUser,
      question,
    });
    await this.questionVotes.save(newVote);
    return;
  }
}
