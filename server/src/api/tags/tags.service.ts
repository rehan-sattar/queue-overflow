import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Tag } from './tags-base.entity';
import { CreateTagDto } from './dto/create-tag.dto';

@Injectable()
export class TagsService {
  @InjectRepository(Tag)
  private readonly tagsRepository: Repository<Tag>;

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
}
