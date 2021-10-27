import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { TokenBlacklistService } from '../token-blacklist/token-blacklist.service';
import * as bcrypt from 'bcrypt';



@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService, private tokenBlacklistService: TokenBlacklistService) {} 

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(email);

        if (!user || !user.password) {
            return null;
        }
        
        const isMatch = await bcrypt.compare(pass, user.password);

        if (isMatch) {
          const { password, ...result} = user;

          return result;
        }
        return null;
      }

    async login(user: any) {

        const payload = { username: user.email, sub: user._id, roles:user.roles, businessId:user.businessId};
        return {
            access_token: this.jwtService.sign(payload, { expiresIn: '30m' }),
        };
    }

    async logout(token: string) {

        this.tokenBlacklistService.addToken(token);

        return {
            message : 'logged out successfully'
        };
    }
}
