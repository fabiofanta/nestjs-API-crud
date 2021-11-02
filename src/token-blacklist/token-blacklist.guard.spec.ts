import { TokenBlacklistGuard } from './token-blacklist.guard';
import { TokenBlacklistService } from '../token-blacklist/token-blacklist.service';

describe('TokenBlacklistGuard', () => {
  it('should be defined', () => {
    expect(new TokenBlacklistGuard(new TokenBlacklistService)).toBeDefined();
  });
});
