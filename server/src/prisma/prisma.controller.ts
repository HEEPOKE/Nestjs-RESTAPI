import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreatePrismaDto } from './dto/create-prisma.dto';
import { UpdatePrismaDto } from './dto/update-prisma.dto';

@Controller('prisma')
export class PrismaController {
  constructor(private readonly prismaService: PrismaService) {}
}
