import {
  Injectable,
  CanActivate,
  ExecutionContext,
  SetMetadata,
  HttpException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import jwt from '../jwt';

export const Roles = (roles: string[]) => SetMetadata('roles', roles);

const matchRoles = (roles: string[], userRole: string) => {
  return roles.includes(userRole);
};

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(context: ExecutionContext): Promise<boolean> | boolean {
    const roles = this.reflector.get<string[]>('roles', context.getClass());
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const isAuthorizeCodeNotExist = request.headers.authorization === undefined;
    if (isAuthorizeCodeNotExist) {
      throw new HttpException(
        {
          message: 'unauthorization',
        },
        401,
      );
    }

    const token = request.headers.authorization.split(' ')[1];
    const userInfo = jwt.verify(token);

    if (!userInfo.isValid) {
      throw new HttpException(
        {
          message: 'unauthorization',
        },
        401,
      );
    }

    if (!matchRoles(roles, userInfo.role)) {
      throw new HttpException(
        {
          message: 'permission forbidden',
        },
        403,
      );
    }

    return matchRoles(roles, userInfo.role);
  }
}
