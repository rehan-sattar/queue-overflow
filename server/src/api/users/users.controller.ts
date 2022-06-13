import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Patch,
  Delete,
  Param,
} from '@nestjs/common';
import { GetLoggedInUser } from '../auth/get-logged-in-user.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { User } from './users.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * getUser
   */
  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  public findUserById(@Param() id: number): Promise<User> {
    return this.usersService.findUserById(id);
  }

  /**
   * createUser
   */
  @Post('/')
  public createUser(@Body() body: CreateUserDTO): Promise<User> {
    return this.usersService.createUser(body);
  }

  /**
   * updateUser
   */
  @Patch('/:id')
  @UseGuards(JwtAuthGuard)
  public updateUser(
    @Param('id') id: number,
    @Body() updatedUser: UpdateUserDTO,
    @GetLoggedInUser() loggedInUser: User,
  ) {
    return this.usersService.updateUser(id, updatedUser, loggedInUser);
  }

  /**
   * deleteUser
   */
  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  public deleteUser(
    @Param('id') id: number,
    @GetLoggedInUser() loggedInUser: User,
  ): Promise<void> {
    return this.usersService.deleteUserById(id, loggedInUser);
  }

  /**
   * me
   */
  @Get('me')
  @UseGuards(JwtAuthGuard)
  public me(@Request() req) {
    return req.user;
  }
}
