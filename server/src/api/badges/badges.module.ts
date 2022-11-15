import { Module } from '@nestjs/common';

import { Badge } from './badges.entity';
import { User } from '../users/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BadgesService } from './badges.service';
import { UsersModule } from '../users/users.module';
import { BadgesController } from './badges.controller';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([Badge, User])],
  providers: [BadgesService],
  controllers: [BadgesController],
})
export class BadgesModule {}
