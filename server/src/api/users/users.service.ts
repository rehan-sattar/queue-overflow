import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './users.entity';
import { UpdateUserDTO } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  logger = new Logger('[User Service]');

  @InjectRepository(User)
  private readonly usersRepository: Repository<User>;

  /**
   * createUser
   */
  public async createUser(body: CreateUserDTO): Promise<User> {
    const { email, password } = body;

    this.logger.log(`Creating user with email: ${email}`);

    const userExist = await this.usersRepository.findOne({ where: { email } });
    if (userExist) {
      this.logger.log(`User already exist! Aborting.`);
      throw new HttpException(
        `User with email '${email}' already exist.`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.usersRepository.create({
      email,
      password: hashedPassword,
    });
    return this.usersRepository.save(user);
  }

  /**
   * findUserById
   */
  public async findUserById(id: number): Promise<User> {
    this.logger.log(`Finding user with id: ${id}`);
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new HttpException(
        `User not found with id: ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }

  /**
   * findUserByEmail
   */
  public async findUserByEmail(email: string): Promise<User> {
    this.logger.log(`Finding user with email: ${email}`);
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new HttpException(
        `User not found with email: ${email}`,
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }

  /**
   * updateUser
   */
  public async updateUser(
    id: number,
    updateUserDto: UpdateUserDTO,
    loggedInUser: User,
  ): Promise<User> {
    if (id !== loggedInUser.id) {
      throw new UnauthorizedException();
    }

    const user = await this.findUserById(id);

    user.username = updateUserDto.username || user.username;
    user.bio = updateUserDto.bio || user.bio;
    user.profilePhoto = updateUserDto.profilePhoto || user.profilePhoto;
    user.location = updateUserDto.location || user.location;
    user.twitterHandle = updateUserDto.twitterHandle || user.twitterHandle;
    user.githubHandle = updateUserDto.githubHandle || user.githubHandle;
    user.website = updateUserDto.website || user.website;
    user.tags = updateUserDto.tags || user.tags;

    this.logger.log(`Updated user: ${JSON.stringify(user)}`);
    return this.usersRepository.save(user);
  }

  /**
   * deleteUserById
   */
  public async deleteUserById(id: number, loggedInUser: User): Promise<void> {
    if (id !== loggedInUser.id) {
      throw new UnauthorizedException();
    }
    this.logger.log(`Deleting user with id: ${id}`);
    const user = await this.findUserById(id);
    await this.usersRepository.remove(user);
    this.logger.log(`User deleted successfully with the id: ${id}`);
    return;
  }
}
