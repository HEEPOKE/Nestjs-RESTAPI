import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { AuthDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  signUp(dto: AuthDto) {
    const saltRounds = 10;
    const myPlaintextPassword = 's0//P4$$w0rD';
    bcrypt.hash(
      myPlaintextPassword,
      saltRounds,
      function (err: any, hash: any) {
       dto.password,
      },
    );
    return { msg: dto };
  }

  signIn() {
    return 'This action adds a new auth';
  }
}
