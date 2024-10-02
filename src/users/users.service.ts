import {
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateUserDto,
  SignUserDto,
  UserOTPDto,
  VerifyTokenDto,
} from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './users.resporitory';

import { IdDto } from 'src/utils/user-id.dto';

@Injectable()
export class UserService {
  private logger = new Logger('User Service');
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}
  async create(createUserDto: CreateUserDto) {
    return await this.userRepository.createUser(createUserDto);
  }

  async findAll() {
    return await this.userRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  findById(userId: string) {
    return this.userRepository.findOne({ where: { id: userId } });
  }

  /**Sign User By email */
  async signUser({ email }: UserOTPDto, jwtSecret: string) {
    return await this.userRepository.signUser({ email }, jwtSecret);
  }

  async verifyOtp(data: SignUserDto, secret: string) {
    const user = await this.userRepository.findOne({ where: data });
    if (user) {
      return await this.signUser(data, secret);
    }
    throw new NotFoundException();
  }

  async verifyToken(data: VerifyTokenDto, secret: string) {
    if (!data.accessToken) {
      throw new ForbiddenException('Invalid token');
    }

    try {
      const user = await this.userRepository.verifyUser(data, secret);
      if (user) {
        return await this.signUser(user, secret);
      }
    } catch (_) {
      throw new ForbiddenException('Revoked Token');
    }
    throw new ForbiddenException('Revoked Token');
  }

  async update(id: IdDto['id'], updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: string) {
    return this.userRepository.softRemove({ id });
  }
}
