import { PartialType, PickType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(
  PickType(CreateUserDto, ['email']),
) {}

export class UpdateUserOtpDto {
  @IsString()
  @IsNotEmpty()
  otp?: string;
}
