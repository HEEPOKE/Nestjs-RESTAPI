import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  async create(createUser: CreateUserDto): Promise<User> {
    const user = new User();
    user.Username = createUser.username;
    user.Email = createUser.email;
    user.Password = createUser.password;
    return await user.save();
  }

  // findAll(): Promise<User[]> {
  //   return this.usersRepository.find();
  // }

  // findOne(id: number): Promise<User> {
  //   return this.usersRepository.findOneBy({ id });
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return this.usersRepository.update(id, updateUserDto);
  // }

  // async remove(id: string): Promise<void> {
  //   await this.usersRepository.delete(id);
  // }
}
