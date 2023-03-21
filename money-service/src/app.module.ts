import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  KeycloakConnectModule,
  ResourceGuard,
  RoleGuard,
  AuthGuard,
} from 'nest-keycloak-connect';
import { ChatGPTService } from './chat-gpt.service';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    KeycloakConnectModule.register({
      authServerUrl: 'http://localhost:8080/auth',
      realm: 'money-gpt',
      clientId: 'money-service',
      secret: process.env.MONEY_SERVICE_KC_CLIENT_TOKEN ?? 'xxx',
    }),
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    }, {
      provide: APP_GUARD,
      useClass: ResourceGuard,
    }, {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
    ChatGPTService],
})
export class AppModule {}
