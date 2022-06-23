import { Controller, Param, Post, UseGuards } from '@nestjs/common';
import { GetLoggedInUser } from 'src/api/auth/get-logged-in-user.decorator';
import { JwtAuthGuard } from 'src/api/auth/jwt-auth.guard';
import { User } from 'src/api/users/users.entity';
import { QuestionVotesService } from './question-votes.service';

@Controller('question-votes')
export class QuestionVotesController {
  constructor(private readonly questionVotesService: QuestionVotesService) {}

  @Post('/:questionId')
  @UseGuards(JwtAuthGuard)
  public voteQuestion(
    @Param('questionId') questionId: number,
    @GetLoggedInUser() loggedInUser: User,
  ) {
    return this.questionVotesService.voteQuestion(questionId, loggedInUser);
  }
}
