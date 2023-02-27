import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import config from './config';
import { AuthService } from './auth/auth.service';
import { WorkiisModule } from './workiis/workiis.module';
//import { SeedModule } from './seed/seed.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from './common/common.module';
//import { UrlModule } from './url/url.module';
import { FilesModule } from './files/files.module';
import { ChatModule } from './chat/chat.module';
import { AplicationWorkiiModule } from './aplication_workii/aplication_workii.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [config],
      isGlobal: true,
    }),
    UsersModule,
    WorkiisModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT! || 5432,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    }),
    CommonModule,
    FilesModule,
    ChatModule,
    AplicationWorkiiModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
