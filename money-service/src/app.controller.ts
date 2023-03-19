import { Controller, Get, Query } from '@nestjs/common';
import { ChatMessage } from 'chatgpt';
import { AppService } from './app.service';
import { ChatGPTService } from './chat-gpt.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly chatGPTService: ChatGPTService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('chat')
  async chat(@Query('message') message: string): Promise<ChatMessage> {
    return await this.chatGPTService.sendMessage(message, {});
  }
}
