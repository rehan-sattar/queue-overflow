import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from './users.dto';
import { User } from './users.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('/')
  /**
   * createUser
   */
  public createUser(@Body() body: CreateUserDTO): Promise<User> {
    return this.userService.createUser(body);
  }
}
