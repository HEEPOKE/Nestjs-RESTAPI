import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  signUp(dto: AuthDto) {
    return { msg: dto };
  }

  signIn() {
    return 'This action adds a new auth';
  }
}
