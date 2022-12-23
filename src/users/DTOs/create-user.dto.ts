import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsArray, MinLength, MaxLength, IsEmail, IsUUID, IsOptional, Matches } from 'class-validator';
import { Workii } from 'src/workiis/entities/workiis.entity';
import { UploadedFile } from '@nestjs/common';

export class CreateUserDto {

    @ApiProperty()
    @IsEmail({ message: "El correo debe ser valido"})
    @MinLength(5, { message:"El campo debe tener por lo menos 5 caracteres" })
    @MaxLength(100, { message: "El campo excede el número de caracteres permitidos"})
    @IsString({message: `El correo debe ser un string`})
    @IsOptional()
    readonly email?: string;

    @ApiProperty()
    @MinLength(6, { message:"El campo debe tener por lo menos 6 caracteres" })
    @MaxLength(50, { message: "El campo excede el número de caracteres permitidos"})
    @IsString({message: `El password debe ser un string`})
    @IsOptional()
    readonly password?: string;
    
    @ApiProperty({ type: 'string', format: 'binary' })
    @MinLength(5, { message:"El campo debe tener por lo menos 5 caracteres" })
    @MaxLength(200, { message: "El campo excede el número de caracteres permitidos"})
    @IsString({message: `El recurso del avatar debe ser un string`})
    @IsOptional()
    readonly avatar?: string;

    @ApiProperty()
    @MinLength(3, { message:"El campo debe tener por lo menos 3 caracteres" })
    @MaxLength(30, { message: "El campo excede el número de caracteres permitidos"})
    @IsString({message: `El nick debe ser un string`})
    readonly nick: string;

    @IsArray({message: `El área de expertis debe ser un array de strings`})
    @ApiProperty({enum: ['Diseño', 'Arte' , 'Computación', 'Medicina', 'Entretenimiento', 'Comunicación']})
    readonly areaOfExpertise: string[] = [];

    @IsArray({message: `La profesión debe ser un array de strings`})
    @ApiProperty({enum: ['programador', 'Veterinario', 'Bioquimico', 'Profesor/ra']})
    readonly profession: string[] = [];

    @ApiProperty()
    @IsArray({message: `Los workiis deben ser un array de strings`})
    readonly workiis?: Workii[] = [];
}