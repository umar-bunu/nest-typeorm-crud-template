import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DataSource, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(_dataSource: DataSource, private jwtService: JwtService) {
    super(User, _dataSource.createEntityManager());
  }
  /**Creates a user and throws an exception if user already exists
   * - Does not hash password as this is just for learning purposes
   */
  async createUser(userCredentials: CreateUserDto) {
    const user = this.create(userCredentials);
    try {
      await this.save(user);
    } catch (err) {
      if (err.code === '23505')
        //duplicate email
        throw new ConflictException('Email already exists');
      else throw new InternalServerErrorException();
    }

    return user;
  }

  async signUser({ email }: { email: string }, jwtSecret: string) {
    const user = await this.findOneBy({ email });
    if (!user) throw new UnauthorizedException();

    const accessToken = this.jwtService.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      {
        secret: jwtSecret,
        expiresIn: 6 * 60 * 60,
      },
    );

    return {
      ...user,
      accessToken,
    };
  }

  /**Call to verify user with their accessToken */
  async verifyUser({ accessToken }: { accessToken: string }, secret: string) {
    return this.jwtService.verify(accessToken, { secret });
  }
}
