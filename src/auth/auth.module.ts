/* eslint-disable @typescript-eslint/no-unused-vars */
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
	imports: [
		PassportModule.register({
			defaultStrategy: 'jwt'
		}),
		JwtModule.registerAsync({
			useFactory: async () => {
				return {
					secret: process.env.JWT_SECRET,
					signOptions: {
						expiresIn: process.env.JWT_EXPIRES_IN || '48h'
					}
				};
			}
		}),
		TypeOrmModule.forFeature([User])
	],
	controllers: [AuthController],
	providers: [JwtStrategy, AuthService],
	exports: [AuthService, JwtStrategy, PassportModule, JwtModule, TypeOrmModule]
})
export class AuthModule implements NestModule {
	configure(userContext: MiddlewareConsumer) {
		/* userContext
      .apply(ValidateJwt)
      .forRoutes({ path: 'auth/revalidate', method: RequestMethod.GET }); */
	}
}
