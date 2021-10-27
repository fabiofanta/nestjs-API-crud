import { CanActivate, ExecutionContext,Injectable } from '@nestjs/common';

@Injectable()
export class UsersDeleteGuard implements CanActivate {
  constructor() {}
  async canActivate(
    context: ExecutionContext
  ): Promise<boolean> {

    const req = context.switchToHttp().getRequest();

    const paramUserId:string = req.params.userId;
    const tokenUserId:string = req.user.userId;

    return paramUserId !== tokenUserId;
  }
}


