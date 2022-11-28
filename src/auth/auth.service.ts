import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(

        private readonly jwtService: JwtService
    ) { }


    /**
    * 生成 token 与 刷新 token
    * @param payload
    * @returns
    */
    genToken(payload: { id: string | number, username: string }) {
        const accessToken =  `Bearer ${this.jwtService.sign(payload)}`
        // const refreshToken = this.jwtService.sign(payload, { expiresIn: 3000 })
        return { accessToken }
    }


    /** 校验 token */
    verifyToken(token: string): string {
        try {
            if (!token) return null
            const id = this.jwtService.verify(token.replace('Bearer ', ''))
            return id
        } catch (error) {
            return null
        }
    }

}
