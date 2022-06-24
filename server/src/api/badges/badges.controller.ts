import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Badge } from './badges.entity';
import { User } from '../users/users.entity';
import { BadgesService } from './badges.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateBadgeDto } from './dto/create-badge.dto';

@Controller('badges')
export class BadgesController {
  constructor(private readonly badgesService: BadgesService) {}

  @Post('/')
  @UseGuards(JwtAuthGuard)
  public createBadge(@Body() createBadgeDto: CreateBadgeDto): Promise<Badge> {
    return this.badgesService.createBadge(createBadgeDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  public getAllBadges(): Promise<Badge[]> {
    return this.badgesService.getAllBadges();
  }

  @Post('/:badgeId/:userId')
  @UseGuards(JwtAuthGuard)
  public assignBadgeToUser(
    @Param('badgeId') badgeId: number,
    @Param('userId') userId: number,
  ): Promise<User> {
    return this.badgesService.assignBadgeToUser(badgeId, userId);
  }

  @Delete('/:badgeId')
  @UseGuards(JwtAuthGuard)
  public deleteBadge(@Param('badgeId') badgeId: number): Promise<void> {
    return this.badgesService.deleteBadge(badgeId);
  }
}
