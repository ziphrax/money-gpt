import { Injectable } from '@nestjs/common';
import { ChatMessage, SendMessageOptions } from 'chatgpt';

export const importDynamic = new Function('modulePath', 'return import(modulePath)');

@Injectable()
export class ChatGPTService {
    private chatGPT: any;

    async onModuleInit() {
        await this.initGPT();
    }

    async initGPT() {
        const { ChatGPTAPI } = await importDynamic('chatgpt');

        this.chatGPT = new ChatGPTAPI({
            apiKey: process.env.OPENAI_API_KEY
        });
}

    async sendMessage(message: string, opts: SendMessageOptions): Promise<ChatMessage> {
        return await this.chatGPT.sendMessage(message, opts);
    }
}
