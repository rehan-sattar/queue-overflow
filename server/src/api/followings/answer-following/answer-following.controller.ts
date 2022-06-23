import { Controller, HttpCode, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/api/auth/jwt-auth.guard';
import { AnswerFollowingService } from './answer-following.service';

@Controller('answer-following')
export class AnswerFollowingController {
  constructor(
    private readonly answerFollowingService: AnswerFollowingService,
  ) {}

  @Post('/follow/:answerId/:followerId')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  public async followAnswer(
    @Param('answerId') answerId: number,
    @Param('followerId') followerId: number,
  ): Promise<void> {
    return this.answerFollowingService.followAnswer(answerId, followerId);
  }

  @Post('/unfollow/:answerId/:followerId')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  public async unFollowAnswer(
    @Param('answerId') answerId: number,
    @Param('followerId') followerId: number,
  ): Promise<void> {
    return this.answerFollowingService.unFollowAnswer(answerId, followerId);
  }
}
