import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import config from './config';
import { AuthService } from './auth/auth.service';
import { WorkiisModule } from './workiis/workiis.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    AuthModule, 
    ConfigModule.forRoot({
      envFilePath: '.env', 
      load: [config],
      isGlobal: true,
    }), 
    UsersModule, WorkiisModule, SeedModule,
  ],
  controllers: [],
  providers: [],
  exports: []
})
export class AppModule {}
