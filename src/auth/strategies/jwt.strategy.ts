import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { User } from '../../users/users.entity';
import { IJwtPaypload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: process.env.JWT_SECRET
		});
	}

	async validate({ id }: IJwtPaypload): Promise<User> {
		const user = await this.userRepository.findOneBy({ id });

		if (!user) {
			throw new UnauthorizedException('El token no es valido');
		}

		if (!user.isActive) {
			throw new UnauthorizedException('El usuario esta inactivo, debes hablar con soporte');
		}

		return user;
	}
}
