import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';

import { RolesGuard } from 'src/guards/roles.guard';

import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/roles.decorator';
import { AgentRole } from 'src/utils/roles/AgentEnum';
import { IdDto } from 'src/utils/user-id.dto';
import {
  CreateUserDto,
  SignUserDto,
  VerifyTokenDto,
} from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(
    private readonly userService: UserService,
    private configService: ConfigService,
  ) {}

  @UseGuards(AuthGuard())
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(AgentRole.SuperAdmin)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Post('/signin')
  async signUer(@Body() signUserDto: SignUserDto) {
    return this.userService
      .signUser(signUserDto, this.configService.get('JWT_SECRET'))
      .catch((err) => {
        this.logger.error('Error while signing user: ', err);
        throw err;
      });
  }

  @Post('/verify-otp')
  verifyOtp(@Body() signUserDto: SignUserDto) {
    return this.userService.verifyOtp(
      signUserDto,
      this.configService.get('JWT_SECRET'),
    );
  }

  @Post('verify-token')
  verifyToken(@Body() dto: VerifyTokenDto) {
    return this.userService.verifyToken(
      dto,
      this.configService.get('JWT_SECRET'),
    );
  }

  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(AgentRole.SuperAdmin)
  @Patch(':id')
  update(@Param('id') id: IdDto['id'], @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
