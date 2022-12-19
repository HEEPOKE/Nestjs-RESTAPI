import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { AuthDto } from './dto';
import encodePassword from 'src/service/encodepassword.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signUp(dto: AuthDto) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(
      dto.password,
      salt,
    );
    return { msg: hash };
  }

  signIn() {
    return 'This action adds a new auth';
  }
}
