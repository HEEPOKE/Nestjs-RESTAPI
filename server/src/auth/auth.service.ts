import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { AuthDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  signUp(dto: AuthDto) {
    const salt = bcrypt.genSalt<string>(10);
    const hashBcrypt = bcrypt.hash(
      dto.password,
      salt,
    );
    return { msg: dto };
  }

  signIn() {
    return 'This action adds a new auth';
  }
}
