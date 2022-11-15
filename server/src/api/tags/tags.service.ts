import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Tag } from './tags-base.entity';
import { CreateTagDto } from './dto/create-tag.dto';
import { AssignTagsDto } from './dto/user-tags.dto';
import { User } from '../users/users.entity';
import { UsersService } from '../users/users.service';
import { UpdateUserDTO } from '../users/dto/update-user.dto';
import { Question } from '../questions/questions.entity';
import { QuestionsService } from '../questions/questions.service';
import { UpdateQuestionDto } from '../questions/dto/update-question.dto';

@Injectable()
export class TagsService {
  @InjectRepository(Tag)
  private readonly tagsRepository: Repository<Tag>;

  constructor(
    private readonly usersService: UsersService,
    private readonly questionsService: QuestionsService,
  ) {}

  private async getTagsByIds(tagIds: number[]) {
    const tags = tagIds.reduce((tags, currentTagId) => {
      const tag = this.getTagById(currentTagId);
      return [...tags, tag];
    }, []);
    return await Promise.all<Tag[]>(tags);
  }

  /**
   * getAllTags
   */
  public async getAllTags(): Promise<Tag[]> {
    return this.tagsRepository.find({});
  }

  /**
   * getTagById
   */
  public async getTagById(id: number): Promise<Tag> {
    const tag = await this.tagsRepository.findOne({ where: { id } });
    if (!tag) {
      throw new NotFoundException(`The tag with the id: ${id} not found.`);
    }
    return tag;
  }

  /**
   * getTagByName
   */
  public async getTagByName(name: string): Promise<Tag> {
    const tag = await this.tagsRepository.findOne({ where: { name } });
    if (!tag) {
      throw new NotFoundException(`The tag with the name: ${name} not found.`);
    }
    return tag;
  }

  /**
   * createTag
   */
  public async createTag(createTagDto: CreateTagDto): Promise<Tag> {
    const { name } = createTagDto;
    const tag = await this.tagsRepository.findOne({ where: { name } });
    if (tag) {
      throw new HttpException(
        `The tag with the name: ${name} already exist.`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const newTag = await this.tagsRepository.create({ name });
    return this.tagsRepository.save(newTag);
  }

  /**
   * deleteTagById
   */
  public async deleteTagById(id: number): Promise<void> {
    const tag = await this.getTagById(id);
    await this.tagsRepository.remove(tag);
    return;
  }

  /**
   * assignTagsToUser
   */
  public async assignTagsToUser(
    userId: number,
    assignTagsDto: AssignTagsDto,
    loggedInUser: User,
  ): Promise<User> {
    if (userId !== loggedInUser.id) {
      throw new UnauthorizedException();
    }
    const tags = await this.getTagsByIds(assignTagsDto.tagIds);
    const updateUserDto = new UpdateUserDTO();
    updateUserDto.tags = tags;
    return this.usersService.updateUser(userId, updateUserDto, loggedInUser);
  }

  /**
   * assignTagsToQuestion
   */
  public async assignTagsToQuestion(
    questionId: number,
    assignTagsDto: AssignTagsDto,
    loggedInUser: User,
  ): Promise<Question> {
    const tags = await this.getTagsByIds(assignTagsDto.tagIds);
    const updateQuestionDto = new UpdateQuestionDto();
    updateQuestionDto.tags = tags;
    return this.questionsService.updateQuestion(
      loggedInUser.id,
      questionId,
      updateQuestionDto,
      loggedInUser,
    );
  }
}
