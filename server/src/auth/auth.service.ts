import { Injectable } from '@nestjs/common';
import { User, Bookmark } from '@prisma/client';

@Injectable()
export class AuthService {
  signIn() {
    return 'This action adds a new auth';
  }

  signUp() {
    return 'This action adds a new auth';
  }
}
