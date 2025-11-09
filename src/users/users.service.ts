import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const salt = await bcrypt.genSalt();
    const password_hash = await bcrypt.hash(createUserDto.password, salt);

    const newUser = this.usersRepository.create({
      ...createUserDto,
      password: password_hash,
    });

    return this.usersRepository.save(newUser);
  }

  async validateUser(
    email: string,
    pass: string,
  ): Promise<Omit<User, 'password_hash'> | null> {
    let user: User | null;
    if (email) {
      user = await this.findOneByEmail(email);
    } else {
      return null;
    }

    if (!user) {
      return null;
    }

    const isMatch = await bcrypt.compare(pass, user.password);

    if (isMatch) {
      return user;
    }
    return null;
  }

  findOneById(id?: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  findOneByEmail(email?: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }

  findAll() {
    return this.usersRepository.find();
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.usersRepository.delete(id);
  }
}
