import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { UserRoles } from '../enums/user.enum';

@Entity({ name: 'users' })
export class User {
  @ApiProperty({ description: 'Primary key as User ID', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'User name', example: 'HEEPOKE' })
  @Column()
  Username: string;

  @ApiProperty({
    description: 'User email address',
    example: 'DAamon1FX@gmail.com',
  })
  @Column({
    unique: true,
  })
  Email: string;

  @ApiProperty({ description: 'Hashed user password' })
  @Column()
  Password: string;

  @Column({ type: 'enum', enum: UserRoles, default: UserRoles.USER })
  Role: UserRoles;

  @ApiProperty({ description: 'When user was created' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'When user was updated' })
  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  async setPassword(password: string) {
    const salt = await bcrypt.genSalt();
    this.Password = await bcrypt.hash(password || this.Password, salt);
  }
}
