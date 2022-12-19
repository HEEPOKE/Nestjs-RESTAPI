import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { AuthDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async signUp(dto: AuthDto) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(
      dto.password,
      salt,
    );
    try {
      const newUser =
        await this.prisma.user.create({
          data: {
            email: dto.email,
            password: hash,
          },
        });
      return newUser;
    } catch (error) {
      if (
        error instanceof
        PrismaClientKnownRequestError
      ) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            'Credentials taken',
          );
        }
      }
      throw error;
    }
  }

  async signIn(dto: AuthDto) {
    const checkUser =
      await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });

    if (!checkUser)
      throw new ForbiddenException(
        'Credentials incorrect',
      );

    const checkPassword = await bcrypt.compare(
      dto.password,
      checkUser.password,
    );

    if (!checkPassword)
      throw new ForbiddenException(
        'Credentials incorrect',
      );

    delete checkUser.password;
    return checkUser;
  }
}
