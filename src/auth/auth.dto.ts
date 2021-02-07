import { IsNotEmpty, Equals, IsAlphanumeric, MinLength } from 'class-validator';
import { JWT } from 'src/constants';

export class CreateUserDto {
  @IsNotEmpty()
  username: string;

  @MinLength(8)
  @IsAlphanumeric()
  @IsNotEmpty()
  password: string;

  @Equals(JWT.CHAPTOR, { message: 'MUST PROVIDE CORRECT CHAPTOR' })
  chaptor: string
}

export class UpdateUserPasswordDto {
  @IsNotEmpty()
  @MinLength(8)
  @IsAlphanumeric()
  oldPassword: string;

  @IsNotEmpty()
  @MinLength(8)
  @IsAlphanumeric()
  password: string;
}