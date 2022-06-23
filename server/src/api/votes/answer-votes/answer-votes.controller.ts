import { Controller, HttpCode, Param, Post, UseGuards } from '@nestjs/common';
import { GetLoggedInUser } from 'src/api/auth/get-logged-in-user.decorator';
import { JwtAuthGuard } from 'src/api/auth/jwt-auth.guard';
import { User } from 'src/api/users/users.entity';
import { AnswerVotesService } from './answer-votes.service';

@Controller('answer-votes')
export class AnswerVotesController {
  constructor(private readonly answersVoteService: AnswerVotesService) {}

  @Post('/:answerId')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  public async voteQuestion(
    @Param('answerId') answerId: number,
    @GetLoggedInUser() loggedInUser: User,
  ) {
    await this.answersVoteService.voteAnswer(answerId, loggedInUser);
  }
}
