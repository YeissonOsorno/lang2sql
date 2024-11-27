import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { TranslateDto } from './dto/translate.dto';
import { TranslateResponse } from './interfaces/index.interface';



@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post()
  async translate(@Body() payload: TranslateDto): Promise<TranslateResponse> {

    try {
      const response: TranslateResponse = await this.appService.translateQuery(payload.prompt);
      return {
        status: response.status,
        message: response.message
      }
    } catch (error) {
      return error;
    }

  }
}
