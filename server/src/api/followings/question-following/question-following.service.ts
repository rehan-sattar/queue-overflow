import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/api/users/users.service';
import { QuestionFollowing } from './question-following.entity';
import { QuestionsService } from 'src/api/questions/questions.service';

@Injectable()
export class QuestionFollowingService {
  @InjectRepository(QuestionFollowing)
  private readonly questionFollowingRepository: Repository<QuestionFollowing>;

  constructor(
    private readonly usersService: UsersService,
    private readonly questionService: QuestionsService,
  ) {}

  private async getFollowing(
    questionId: number,
    followerId: number,
  ): Promise<QuestionFollowing> {
    const currentFollowing = await this.questionFollowingRepository.findOne({
      where: {
        follower: { id: followerId },
        question: { id: questionId },
      },
    });
    return currentFollowing;
  }

  public async followQuestion(
    questionId: number,
    followerId: number,
  ): Promise<void> {
    const currentFollowing = await this.getFollowing(questionId, followerId);
    if (currentFollowing) return;
    const question = await this.questionService.getQuestionById(questionId);
    const follower = await this.usersService.findUserById(followerId);
    const following = this.questionFollowingRepository.create({
      question,
      follower,
    });
    await this.questionFollowingRepository.save(following);
    return;
  }

  public async unFollowQuestion(
    questionId: number,
    followerId: number,
  ): Promise<void> {
    const currentFollowing = await this.getFollowing(questionId, followerId);
    if (!currentFollowing)
      throw new NotFoundException(`The following not found.`);
    await this.questionFollowingRepository.remove(currentFollowing);
    return;
  }
}
