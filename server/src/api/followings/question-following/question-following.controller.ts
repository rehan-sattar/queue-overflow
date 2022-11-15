import { Controller, HttpCode, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/api/auth/jwt-auth.guard';
import { QuestionFollowingService } from './question-following.service';

@Controller('question-following')
export class QuestionFollowingController {
  constructor(
    private readonly questionFollowingService: QuestionFollowingService,
  ) {}

  @Post('/follow/:questionId/:followerId')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  public async followQuestion(
    @Param('questionId') questionId: number,
    @Param('followerId') followerId: number,
  ): Promise<void> {
    return this.questionFollowingService.followQuestion(questionId, followerId);
  }

  @Post('/unfollow/:questionId/:followerId')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  public async unFollowQuestion(
    @Param('questionId') questionId: number,
    @Param('followerId') followerId: number,
  ): Promise<void> {
    return this.questionFollowingService.unFollowQuestion(
      questionId,
      followerId,
    );
  }
}
