import { Injectable } from '@nestjs/common';
import { TranslateDto } from './dto/translate.dto';
import { TranslateResponse } from './interfaces/index.interface';
import { OpenAiService } from './openai/open-ai.service';

@Injectable()
export class AppService {
  constructor(private readonly openAiService:OpenAiService) {}
  async translateQuery(prompt:string): Promise<TranslateResponse> {

    const responseOpenAi = await this.openAiService.chatGptRequest(prompt, []);
    return {
      status: 'success',
      message: responseOpenAi
    }
  }
}
