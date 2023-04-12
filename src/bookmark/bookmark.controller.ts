import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Delete,
  UseGuards,
  Redirect,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BookmarkService } from './bookmark.service';
import {
  CreateBookmarkDto,
  UpdateBookmarkDto,
} from './dto';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {
  constructor(
    config: ConfigService,
    private bookmarkService: BookmarkService,
  ) {}

  @Get('getbookmark')
  findAll() {
    return this.bookmarkService.findAll();
  }

  @Get('mybookmark')
  getBookmarks(@GetUser('id') userId: number) {
    return this.bookmarkService.getBookmarkUser(
      userId,
    );
  }

  @Get('bookmark/:id')
  async getBookmarkById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
  ) {
    const getBookmarkById =
      await this.bookmarkService.getBookmarkUserById(
        userId,
        bookmarkId,
      );

    if (!getBookmarkById) {
      return new NotFoundException(
        `userId ${userId} not found Bookmark`,
      );
    }
    return getBookmarkById;
  }

  @Post('add')
  // @Redirect(config.get('ENDPOINT_URL'), 200)
  createBookmark(
    @GetUser('id') userId: number,
    @Body() dto: CreateBookmarkDto,
  ) {
    return this.bookmarkService.createBookmark(
      userId,
      dto,
    );
  }

  @Patch('update/:id')
  updateBookmarkById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
    @Body() dto: UpdateBookmarkDto,
  ) {
    return this.bookmarkService.updateBookmark(
      userId,
      bookmarkId,
      dto,
    );
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('delete/:id')
  deleteBookmarkById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
  ) {
    return this.bookmarkService.deleteBookmarkById(
      userId,
      bookmarkId,
    );
  }
}
