import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../users/users.entity';

export const GetLoggedInUser = createParamDecorator(
  (_data, context: ExecutionContext): User => {
    const request = context.switchToHttp().getRequest();
    return request.user;
  },
);
