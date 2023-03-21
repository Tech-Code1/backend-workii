import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import config from './config';
import { WorkiisModule } from './workiis/workiis.module';
//import { SeedModule } from './seed/seed.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from './common/common.module';
import { FilesModule } from './files/files.module';
import { ChatModule } from './chat/chat.module';
import { ApplicationWorkiiModule } from './aplication_workii/application_workii.module';
import { dataSourceOptions } from './shared/typeorm/data-source';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

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
    TypeOrmModule.forRoot(dataSourceOptions),
    CommonModule,
    FilesModule,
    ChatModule,
    ApplicationWorkiiModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
      serveRoot: '/static'
    }),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
