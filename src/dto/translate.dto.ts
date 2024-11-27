import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class TranslateDto {
    @IsString()
    @MaxLength(255)
    @IsNotEmpty()
    prompt: string;

}
