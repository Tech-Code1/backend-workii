import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginUserDto {
	@ApiProperty()
	@IsEmail()
	@MinLength(5, { message: 'El campo debe tener por lo menos 5 caracteres' })
	@MaxLength(100, { message: 'El campo excede el número de caracteres permitidos' })
	@IsString({ message: `El correo debe ser un string` })
	readonly email: string;

	@ApiProperty()
	@MinLength(6, { message: 'El campo debe tener por lo menos 6 caracteres' })
	@MaxLength(50, { message: 'El campo excede el número de caracteres permitidos' })
	@IsString({ message: `El password debe ser un string` })
	readonly password: string;
}
