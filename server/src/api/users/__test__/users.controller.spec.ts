/* eslint-disable @typescript-eslint/no-empty-function */
import { Test, TestingModule } from '@nestjs/testing';

import { User } from '../users.entity';
import { UsersService } from '../users.service';
import { UsersController } from '../users.controller';
import { createUserStub } from '../../../../test/stubs/user.stub';
import { CreateUserDTO } from '../dto/create-user.dto';
import { UpdateUserDTO } from '../dto/update-user.dto';

// mocking the user service
jest.mock('../users.service');

describe('Users Controller Unit Tests', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    usersController = moduleRef.get<UsersController>(UsersController);
    usersService = moduleRef.get<UsersService>(UsersService);

    jest.clearAllMocks();
  });

  describe('User Controller', () => {
    describe('When `getUserById` is called', () => {
      let user: User;
      const stubbedUser = createUserStub();

      beforeEach(async () => {
        user = await usersController.getUserById(stubbedUser.id);
      });

      it('should call usersService', () => {
        expect(usersService.findUserById).toHaveBeenCalledWith(stubbedUser.id);
      });

      it('should return a user', () => {
        expect(user).toEqual(stubbedUser);
      });
    });

    describe('When `createUser` is called', () => {
      let user: User;
      const stubbedUser = createUserStub();
      let createUserDto = new CreateUserDTO();

      beforeEach(async () => {
        createUserDto = {
          email: stubbedUser.email,
          password: stubbedUser.password,
        };
        user = await usersController.createUser(createUserDto);
      });

      it('should be call with createUserDto', () => {
        expect(usersService.createUser).toBeCalledWith(createUserDto);
      });

      it('should return a new user', () => {
        expect(user.email).toBe(stubbedUser.email);
      });
    });

    describe('When `updateUser` is called', () => {
      let user: User;
      const stubbedUser = createUserStub();
      let updateUserDto = new UpdateUserDTO();

      beforeEach(async () => {
        updateUserDto = {
          bio: 'Something new!',
        };

        user = await usersController.updateUser(
          stubbedUser.id,
          updateUserDto,
          stubbedUser,
        );
      });

      it('should call the usersService with correct params', () => {
        expect(usersService.updateUser).toHaveBeenCalledWith(
          stubbedUser.id,
          updateUserDto,
          stubbedUser,
        );
      });

      it('should return the updated user', () => {
        expect(user.bio).toBe(stubbedUser.bio);
      });
    });

    describe('When `deleteUser` is called', () => {});
  });
});
