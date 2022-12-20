import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateBookmarkDto,
  UpdateBookmarkDto,
} from './dto';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}

  create(createBookmarkDto: CreateBookmarkDto) {
    return 'This action adds a new bookmark';
  }

  findAll() {
    return `This action returns all bookmark`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bookmark`;
  }

  update(
    id: number,
    updateBookmarkDto: UpdateBookmarkDto,
  ) {
    return `This action updates a #${id} bookmark`;
  }

  remove(id: number) {
    return `This action removes a #${id} bookmark`;
  }
}
