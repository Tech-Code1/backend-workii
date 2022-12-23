import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from '../../users/users.entity';
import { IJwtPaypload } from "../interfaces/jwt-payload.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { jwtConstants } from "../jwt.constants";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignorateExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        })
    }

    async Validate({email}: IJwtPaypload): Promise<User> {

        const user = await this.userRepository.findOneBy({email})

        if(!user) {
            throw new UnauthorizedException("El token no es valido")
        }

        if(user.isActive) {
            throw new UnauthorizedException('El usuario esta inactivo, debes hablar con soporte')
        }

        return user
    }
}