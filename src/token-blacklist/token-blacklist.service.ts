import { Injectable } from '@nestjs/common';
import { createBlackList, BlackList } from 'jwt-blacklist';


@Injectable()
export class TokenBlacklistService {
    constructor() {}

    private blacklist:BlackList;

    
    static async initBlackList():Promise<BlackList> {
        const newBlacklist = await createBlackList({
            daySize: 10000, // optional, number of tokens need revoking each day
            errorRate: 0.001, // optional, error rate each day
        });

        this.prototype.blacklist = newBlacklist;

        return newBlacklist;
    }

    async addToken(token:string):Promise<boolean> {
        return this.blacklist.add(token);
    }

    async verifyToken(token:string):Promise<boolean> {
        return this.blacklist.has(token);
    }
}
