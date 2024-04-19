import { IsString, MaxLength, IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterInputDto {

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @MaxLength(20)
  @IsNotEmpty()
  userName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  password: string;

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsString()
  @IsNotEmpty()
  birthday: string;
}
