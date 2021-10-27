import { CanActivate, ExecutionContext,Injectable } from '@nestjs/common';

@Injectable()
export class BusinessesGuard implements CanActivate {
  constructor() {}
  async canActivate(
    context: ExecutionContext
  ): Promise<boolean> {

    const req = context.switchToHttp().getRequest();

    const paramBusinessId:string = req.params.businessId;
    const tokenBusinessId:string = req.user.businessId;

    return paramBusinessId === tokenBusinessId;
  }
}
