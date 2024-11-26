import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { TranslateDto } from './dto/translate.dto';
import { TranslateResponse } from './interfaces/index.interface';



@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  translate(@Body() payload: TranslateDto): TranslateResponse {

    return {status: 'success', message: payload.prompt};
  }
}
