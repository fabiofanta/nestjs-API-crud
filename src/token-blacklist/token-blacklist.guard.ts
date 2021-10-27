import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { TokenBlacklistService } from '../token-blacklist/token-blacklist.service';


@Injectable()
export class TokenBlacklistGuard implements CanActivate {
  constructor(private tokenBlacklistService: TokenBlacklistService) {}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const token = context.switchToHttp().getRequest().headers.authorization.split(' ');
    
    const isBlacklisted = await this.tokenBlacklistService.verifyToken(token[1]);

    if (isBlacklisted) {
      throw new UnauthorizedException();
    }

    return true
  }
}
