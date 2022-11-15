import {
  Controller,
  Param,
  Get,
  Post,
  Delete,
  Body,
  UseGuards,
  Query,
  BadRequestException,
} from '@nestjs/common';

import { Tag } from './tags-base.entity';
import { User } from '../users/users.entity';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { AssignTagsDto } from './dto/user-tags.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetLoggedInUser } from '../auth/get-logged-in-user.decorator';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getAllTags(): Promise<Tag[]> {
    return this.tagsService.getAllTags();
  }

  @Get('/tag')
  @UseGuards(JwtAuthGuard)
  getTag(@Query('id') id: number, @Query('name') name: string): Promise<Tag> {
    if (id) {
      return this.tagsService.getTagById(id);
    } else if (name) {
      return this.tagsService.getTagByName(name);
    } else {
      throw new BadRequestException(`Please provide id or name in the params.`);
    }
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  createTag(@Body() createTagDto: CreateTagDto): Promise<Tag> {
    return this.tagsService.createTag(createTagDto);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  deleteTagById(@Param('id') id: number): Promise<void> {
    return this.tagsService.deleteTagById(id);
  }

  /**
   * Assign tags to user
   */
  @Post('/user/:userId')
  @UseGuards(JwtAuthGuard)
  assignTagsToUser(
    @Param('userId') userId: number,
    @Body() assignTagsDto: AssignTagsDto,
    @GetLoggedInUser() loggedInUser: User,
  ) {
    return this.tagsService.assignTagsToUser(
      userId,
      assignTagsDto,
      loggedInUser,
    );
  }

  /**
   * Assign tags to question
   */
  @Post('/question/:questionId')
  @UseGuards(JwtAuthGuard)
  assignTagsToQuestion(
    @Param('questionId') questionId: number,
    @Body() assignTagsDto: AssignTagsDto,
    @GetLoggedInUser() loggedInUser: User,
  ) {
    return this.tagsService.assignTagsToQuestion(
      questionId,
      assignTagsDto,
      loggedInUser,
    );
  }
}
