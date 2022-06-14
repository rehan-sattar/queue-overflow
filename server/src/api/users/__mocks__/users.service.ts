import { createUserStub } from '../../../../test/stubs/user.stub';

export const UsersService = jest.fn().mockReturnValue({
  createUser: jest.fn().mockResolvedValue(createUserStub()),
  findUserById: jest.fn().mockResolvedValue(createUserStub()),
  findUserByEmail: jest.fn().mockResolvedValue(createUserStub()),
  updateUser: jest.fn().mockResolvedValue(createUserStub()),
  deleteUserById: jest.fn().mockResolvedValue(undefined),
});
