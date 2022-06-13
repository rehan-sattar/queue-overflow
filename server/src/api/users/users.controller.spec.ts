/* eslint-disable @typescript-eslint/no-empty-function */
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { CreateUserDTO } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDTO } from './dto/update-user.dto';
import { User } from './users.entity';

describe('Users Controller Unit Tests', () => {
  let usersController: UsersController;
  let usersSpyService: UsersService;

  beforeAll(async () => {
    const UsersServiceProvider = {
      provide: UsersService,
      useFactory: () => ({
        createUser: jest.fn(() => {}),
        findUserById: jest.fn(() => {}),
        findUserByEmail: jest.fn(() => {}),
        updateUser: jest.fn(() => {}),
        deleteUserById: jest.fn(() => {}),
      }),
    };

    const app: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, UsersServiceProvider],
    }).compile();

    usersController = app.get<UsersController>(UsersController);
    usersSpyService = app.get<UsersService>(UsersService);
  });

  it('should call getUserById method', () => {
    usersController.findUserById(1);
    expect(usersSpyService.findUserById).toHaveBeenCalled();
  });

  it('should call createUser method', () => {
    const createUserDto = new CreateUserDTO();
    expect(usersController.createUser(createUserDto)).not.toEqual(null);
  });

  it('should call user service methods while creating user', () => {
    const createUserDto = new CreateUserDTO();
    usersController.createUser(createUserDto);
    expect(usersSpyService.createUser).toHaveBeenCalled();
    expect(usersSpyService.createUser).toHaveBeenCalledWith(createUserDto);
  });

  it('should call update user method', async () => {
    const updateUserDTO = new UpdateUserDTO();
    const user = new User();
    user.id = 1;
    usersController.updateUser(user.id, updateUserDTO, user);
    expect(usersSpyService.updateUser).toHaveBeenCalled();
    expect(usersSpyService.updateUser).toHaveBeenCalledWith(
      user.id,
      updateUserDTO,
      user,
    );
  });

  it('should call delete user method', async () => {
    const user = new User();
    user.id = 1;
    usersController.deleteUser(user.id, user);
    expect(usersSpyService.deleteUserById).toHaveBeenCalled();
    expect(usersSpyService.deleteUserById).toHaveBeenCalledWith(user.id, user);
  });
});
