import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { AuthDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

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

  signIn() {
    return 'This action adds a new auth';
  }
}
