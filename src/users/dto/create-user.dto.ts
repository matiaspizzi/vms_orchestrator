import { UserRole } from '../entities/user.entity';
import { IsString, IsEmail, IsOptional, IsEnum, Length } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(2, 20)
  name: string;

  @IsString()
  @Length(2, 20)
  surname: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @IsString()
  @Length(6, 32)
  password: string;
}
