import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './users.dto';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  @InjectRepository(User)
  private readonly usersRepository: Repository<User>;

  /**
   * createUser
   */
  public async createUser(body: CreateUserDTO): Promise<User> {
    const { email, password } = body;

    const userExist = await this.usersRepository.find({ where: { email } });
    if (userExist) {
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
  public findUser(id: number): Promise<User> {
    const user = this.usersRepository.findOne({ where: { id } });
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
  public findUserByEmail(email: string): Promise<User> {
    const user = this.usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new HttpException(
        `User not found with email: ${email}`,
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }
}
