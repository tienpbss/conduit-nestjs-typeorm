import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const UserId = createParamDecorator(
  (data: string, context: ExecutionContext): string => {
    const request = context.switchToHttp().getRequest();
    const userId = request.userId;
    return userId ? userId : 'No user';
    // Returns the id 'No User' so that future queries will return user: null.
    // If userId: undefined, the 'find' query will return the first result
  },
);
