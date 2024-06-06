import { CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';
import { Request } from 'express';

export class AuthGuard implements CanActivate {
    url= 'http://localhost:3000/can-do/';
    constructor(private permissionCode:String) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const request: Request = context.switchToHttp().getRequest();
            const token = request.headers.authorization;
            if (token == null) {
                throw new UnauthorizedException('El token no existe');
            }
            (
                await axios.get(`${this.url}/${this.permissionCode}`, {
                    headers: {
                        Authorization: token,
                    },
                })
            ).data;
            return true;
        } catch (error) {
            throw new UnauthorizedException(error?.message);
        }
    }
}
