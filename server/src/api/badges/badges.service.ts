import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Badge } from './badges.entity';
import { User } from '../users/users.entity';
import { CreateBadgeDto } from './dto/create-badge.dto';

@Injectable()
export class BadgesService {
  @InjectRepository(Badge)
  private readonly badgeRepository: Repository<Badge>;

  @InjectRepository(User)
  private readonly usersRepository: Repository<User>;

  /**
   * getBadgeById
   */
  private async getBadgeById(id: number): Promise<Badge> {
    const badge = await this.badgeRepository.findOne({ where: { id } });
    if (!badge) {
      throw new NotFoundException(`Badge with id ${id} not found.`);
    }
    return badge;
  }

  /**
   * createBadge
   */
  public async createBadge(createBadgeDto: CreateBadgeDto): Promise<Badge> {
    const { name } = createBadgeDto;
    const currentBadge = await this.badgeRepository.findOne({
      where: { name },
    });
    if (currentBadge) {
      throw new UnprocessableEntityException(
        `Badge with name ${name} already exist.`,
      );
    }
    const badge = this.badgeRepository.create({ name });
    const newBadge = await this.badgeRepository.save(badge);
    return newBadge;
  }

  /**
   * getAllBadges
   */
  public getAllBadges(): Promise<Badge[]> {
    return this.badgeRepository.find({ select: { id: true, name: true } });
  }

  /**
   * assignBadgeToUser
   */
  public async assignBadgeToUser(
    badgeId: number,
    userId: number,
  ): Promise<User> {
    const badge = await this.getBadgeById(badgeId);
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: { badges: true },
    });
    if (!user) {
      throw new NotFoundException(`User with id: ${userId} doesn't exist.`);
    }
    const existingBadge = await this.badgeRepository.findOne({
      where: { id: badgeId, user: { id: userId } },
    });
    if (existingBadge) {
      throw new UnprocessableEntityException(
        `Badge already exist for this user.`,
      );
    }
    user.badges = [...user.badges, badge];
    return this.usersRepository.save(user);
  }

  /**
   * deleteBadge
   */
  public async deleteBadge(badgeId: number): Promise<void> {
    const badge = await this.getBadgeById(badgeId);
    await this.badgeRepository.remove(badge);
    return;
  }
}
