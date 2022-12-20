import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateUserDto,
  UpdateUserDto,
} from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(
    userId: number,
    updateUserDto: UpdateUserDto,
  ) {
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...updateUserDto,
      },
    });

    delete user.password;
    return user;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
