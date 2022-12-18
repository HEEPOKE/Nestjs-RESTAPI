import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { AuthDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  signUp(dto: AuthDto) {
    const saltOrRounds = 10;
    const hash = bcrypt.hash(
      dto.password,
      saltOrRounds,
    );
    return { msg: hash };
  }

  signIn() {
    return 'This action adds a new auth';
  }
}
