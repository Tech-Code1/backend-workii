import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AuthModule.forRoot({
      connectionURI: "https://aec8d6015ee611ed9050550fa516cb95-us-east-1.aws.supertokens.io:3573",
      apiKey: "07FeySLxBv4-USpvdK8JP4XeorbQNS",
      appInfo: {
        // Learn more about this on https://supertokens.com/docs/thirdpartyemailpassword/appinfo
        appName: "workii",
        apiDomain: "http://localhost:3000",
        websiteDomain: "http://localhost:8080",
        apiBasePath: "/auth",
        websiteBasePath: "/auth"
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
