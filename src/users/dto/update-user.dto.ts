import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { UserRole } from '../entities/user.entity';
import { IsString, IsEmail, IsOptional, IsEnum, Length } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  @Length(2, 20)
  name?: string;

  @IsString()
  @IsOptional()
  @Length(2, 20)
  surname?: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @IsString()
  @IsOptional()
  @Length(6, 32)
  password?: string;
}
