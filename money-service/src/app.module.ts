import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatGPTService } from './chat-gpt.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, ChatGPTService],
})
export class AppModule {}
