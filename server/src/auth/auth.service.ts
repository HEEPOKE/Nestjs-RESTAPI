import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { AuthDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signUp(dto: AuthDto) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(
      dto.password,
      salt,
    );
    const newUser = await this.prisma.User.create(
      {
        data: {
          email: dto.email,
          password: hash,
        },
      },
    );
    return newUser;
  }

  signIn() {
    return 'This action adds a new auth';
  }
}
