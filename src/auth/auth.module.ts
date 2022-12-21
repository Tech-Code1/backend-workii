import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConstants } from './jwt.constants';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';


@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '24h' }
    })
  ],
  controllers: [AuthController],
  providers: [
    JwtStrategy,
    AuthService,
  ],
  exports: [
    AuthService
  ]
})
export class AuthModule {}
