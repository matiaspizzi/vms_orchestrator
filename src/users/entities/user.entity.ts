import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Length, IsEmail } from 'class-validator';

export enum UserRole {
  SUPERADMIN = 'SUPERADMIN',
  ADMIN = 'ADMIN',
  USER = 'USER',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  @Length(2, 20)
  name: string;

  @Column({ nullable: false })
  @Length(2, 20)
  surname: string;

  @Column({ unique: true, nullable: false })
  @IsEmail()
  email: string;

  @Column({ nullable: false })
  @Length(6, 20)
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;
}
