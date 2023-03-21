import { Controller, Get, Query } from '@nestjs/common';
import { ChatMessage } from 'chatgpt';
import { AppService } from './app.service';
import { ChatGPTService } from './chat-gpt.service';
import {
  Roles,
  Unprotected,
} from 'nest-keycloak-connect';
import { RoleDecoratorOptionsInterface } from 'nest-keycloak-connect/interface/role-decorator-options.interface';

const roles: RoleDecoratorOptionsInterface = {
  roles: ['admin', 'user'],
};

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly chatGPTService: ChatGPTService) {}

  @Get()
  @Unprotected()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('chat')
  @Roles(roles)
  async chat(@Query('message') message: string): Promise<ChatMessage> {
    return await this.chatGPTService.sendMessage(message, {});
  }
}
