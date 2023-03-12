import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetCurrentUserId = createParamDecorator((undefined, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();

  return request.user['sub'];
});
