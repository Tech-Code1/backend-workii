import { Workii } from '@db/entities';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmail, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { Etarget } from '../../workii/interfaces/target.interface';
import { EProfession } from '../interfaces/profession.interface';

export class CreateUserDto {
	@ApiProperty({
		description: 'Correo del usuario',
		uniqueItems: true,
		required: true,
		nullable: false
	})
	@IsEmail()
	@MinLength(5, { message: 'El campo debe tener por lo menos 5 caracteres' })
	@MaxLength(100, {
		message: 'El campo excede el número de caracteres permitidos'
	})
	@IsString({ message: `El correo debe ser un string` })
	@IsOptional()
	email?: string;

	@ApiProperty({
		description: 'Contraseña del usuario',
		uniqueItems: false,
		required: true,
		nullable: false
	})
	@MinLength(6, { message: 'El campo debe tener por lo menos 6 caracteres' })
	@MaxLength(50, {
		message: 'El campo excede el número de caracteres permitidos'
	})
	@IsString({ message: `El password debe ser un string` })
	@IsOptional()
	password: string;

	@ApiProperty({
		description: 'Avatar del usuario',
		uniqueItems: false,
		required: true,
		format: 'binary',
		nullable: false
	})
	@MinLength(5, { message: 'El campo debe tener por lo menos 5 caracteres' })
	@MaxLength(200, {
		message: 'El campo excede el número de caracteres permitidos'
	})
	@IsString({ message: `El recurso del avatar debe ser un string` })
	@IsOptional()
	avatar?: string;

	@ApiProperty({
		description: 'Apodo del usuario',
		uniqueItems: true,
		required: true,
		nullable: false
	})
	@MinLength(3, { message: 'El campo debe tener por lo menos 3 caracteres' })
	@MaxLength(30, {
		message: 'El campo excede el número de caracteres permitidos'
	})
	@IsString({ message: `El nick debe ser un string` })
	nick: string;

	@ApiProperty({
		description: 'Area en el que se especializa el usuario',
		uniqueItems: false,
		required: true,
		enum: Etarget,
		nullable: false
	})
	@IsString({
		message: `El área de expertis debe ser un string`
	})
	@IsOptional()
	areaOfExpertise: string;

	@ApiProperty({
		description: 'Profesion del usuario',
		uniqueItems: false,
		required: true,
		enum: EProfession,
		nullable: false
	})
	@IsOptional()
	@IsString({ message: `La profesión debe ser un string` })
	profession: string;

	@ApiProperty({
		description: 'Workiis creados por el usuario',
		uniqueItems: false,
		default: [],
		required: false,
		nullable: true
	})
	@IsArray({ message: `El workii tiene un formato erroneo` })
	workiis?: Workii[] = [];
}
