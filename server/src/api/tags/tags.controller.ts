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
import { CreateTagDto } from './dto/create-tag.dto';
import { TagsService } from './tags.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

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
}
