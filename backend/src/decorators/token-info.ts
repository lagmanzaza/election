import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import jwt from '../jwt';
export default createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const token = request.headers.authorization.split(' ')[1];
  const userInfo = jwt.verify(token);
  return userInfo;
});
