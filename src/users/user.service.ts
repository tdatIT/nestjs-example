import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserRequest } from './dto/create-user';
import { UpdateUserRequest } from './dto/update-user';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  createNewUser(req: CreateUserRequest) {
    const newUser = new User();
    newUser.firstName = req.first_name;
    newUser.lastName = req.last_name;
    newUser.password = req.password;
    newUser.isActive = req.is_active;

    return this.usersRepository.save(newUser);
  }

  updateUser(id: number, req: UpdateUserRequest) {
    const user = this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new Error('User not found');
    }

    // Assuming req contains the fields to be updated
    const updatedUser = {
      ...user,
      ...req,
    };

    this.usersRepository.update(id, updatedUser);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
