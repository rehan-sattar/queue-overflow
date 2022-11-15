import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/api/users/users.service';
import { AnswerFollowing } from './answer-following.entity';
import { AnswersService } from 'src/api/answers/answers.service';

@Injectable()
export class AnswerFollowingService {
  @InjectRepository(AnswerFollowing)
  private readonly answersFollowingRepository: Repository<AnswerFollowing>;

  constructor(
    private readonly usersService: UsersService,
    private readonly answersService: AnswersService,
  ) {}

  private async getFollowing(
    answerId: number,
    followerId: number,
  ): Promise<AnswerFollowing> {
    const currentFollowing = await this.answersFollowingRepository.findOne({
      where: {
        follower: { id: followerId },
        answer: { id: answerId },
      },
    });
    return currentFollowing;
  }

  public async followAnswer(
    answerId: number,
    followerId: number,
  ): Promise<void> {
    const currentFollowing = await this.getFollowing(answerId, followerId);
    if (currentFollowing) return;
    const answer = await this.answersService.getAnswerById(answerId);
    const follower = await this.usersService.findUserById(followerId);
    const following = this.answersFollowingRepository.create({
      follower,
      answer,
    });
    await this.answersFollowingRepository.save(following);
    return;
  }

  public async unFollowAnswer(
    answerId: number,
    followerId: number,
  ): Promise<void> {
    const currentFollowing = await this.getFollowing(answerId, followerId);
    if (!currentFollowing)
      throw new NotFoundException(`The following not found.`);
    await this.answersFollowingRepository.remove(currentFollowing);
    return;
  }
}
