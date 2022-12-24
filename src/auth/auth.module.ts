import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';


@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.registerAsync({
      
      useFactory: async () => {
          return {
            secret: process.env.JWT_SECRET,
            signOptions: {
              expiresIn: '2h'
          }
        }
      }
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [
    JwtStrategy,
    AuthService,
  ],
  exports: [
    AuthService,
    JwtStrategy,
    PassportModule,
    JwtModule
  ]
})
export class AuthModule {}
