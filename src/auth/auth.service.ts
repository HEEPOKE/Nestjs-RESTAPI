import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { AuthDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
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
        'Email incorrect',
      );

    const checkPassword = await bcrypt.compare(
      dto.password,
      checkUser.password,
    );

    if (!checkPassword)
      throw new ForbiddenException(
        'Password incorrect',
      );

    return this.generateToken(
      checkUser.id,
      checkUser.email,
    );
  }

  async generateToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      id: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(
      payload,
      {
        expiresIn: '360m',
        secret: secret,
      },
    );

    return {
      access_token: token,
    };
  }
}
