import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { AgentRole } from 'src/utils/roles/AgentEnum';

export class CreateUserDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  phone: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsEnum(AgentRole)
  role: AgentRole;
}

export class UserOTPDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class SignUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  otp: string;
}

export class VerifyTokenDto {
  @IsString()
  @IsNotEmpty()
  accessToken: string;
}
