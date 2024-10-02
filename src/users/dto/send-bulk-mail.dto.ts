import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from 'class-validator';

export class SendBulkMailDto {
  @IsArray()
  // "each" tells class-validator to run the validation on each item of the array
  @IsString({ each: true })
  @ArrayMinSize(1)
  recipients: string[];

  @IsString()
  @IsNotEmpty()
  html: string;

  @IsString()
  @IsNotEmpty()
  subject: string;
}
