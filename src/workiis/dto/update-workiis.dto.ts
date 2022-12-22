import { ApiProperty, PartialType } from '@nestjs/swagger';
import { ArrayMaxSize, ArrayMinSize, IsArray, IsIn, IsNumber, IsOptional, IsPositive, IsString, Matches, Max, MaxLength, Min, MinLength, validate } from 'class-validator';
import { CreateWorkiiDto } from './create-workiis.dto';

export class UpdateWikiiDto extends PartialType(CreateWorkiiDto) {

  @ApiProperty()
  @MaxLength(150, { message: "El campo excede el número de caracteres permitidos"})
  @MinLength(1, { message: "El campo no puede estar vacio"})
  @IsString({message: `El correo debe ser un string`})
  name: string;

  @ApiProperty()
  @IsString({each: true})
  @IsIn([
      "Arte", 
      "Informatica", 
      "Humanidades", 
      "Ciencias", 
      "Ingenieria",
      "Entretenimiento",
      "Comunicaciones",
      "Marketing",
      "Otro"], {each: true})
  @ArrayMinSize(1)
  @ArrayMaxSize(3)
  target: string[]

  @ApiProperty()
  @MaxLength(300, { message: "El campo excede el número de caracteres permitidos"})
  @MinLength(1, { message: "El campo no puede estar vacio"})
  @IsString()
  description: string;

  @ApiProperty()
  @MaxLength(150, {each:true, message: "El campo excede el número de caracteres permitidos"})
  @MinLength(1, {each:true, message: "El campo no puede estar vacio"})
  @IsString({each: true})
  @IsArray()
  toDoList: string[];

  @ApiProperty()
  @Min(1, { message: "El minimo costo de un Workii no puede ser inferior a 1 dolar"})
  @Max(1000000, { message: "El campo excede el costo de lo que puede costar un Workii"})
  @IsNumber()
  cost: number;

  @ApiProperty()
  @IsString()
  @MaxLength(30, { message: "El campo excede el número de caracteres permitidos"})
  @Matches(/^(?:[a-zA-ZñÑ0-9]+(?:[ _-][a-zA-ZñÑ0-9]+)*)(?:[ ]{1}(?:[a-zA-ZñÑ0-9]+(?:[ _-][a-zA-ZñÑ0-9]+)*))*$/ , { message: "El formato del slug es incorrecto"})
  slug: string;

  @ApiProperty({enum: [
      {id: 1, status: "Busqueda"}, 
      {id: 2, status: "Eligiendo"},
      {id: 3, status: "Iniciado"},
      {id: 4, status: "Finalizado"},
  ]})
  @IsString()
  @IsOptional()
  @IsIn(['Busqueda', 'Eligiendo', 'Iniciado', 'Finalizado'])
  status?: string;

  @ApiProperty()
  @Min(3, { message: "El tiempo minimo para cumplir la tarea es de 3 días"})
  @Max(15, { message: "El tiempo minimo para cumplir la tarea es de 15 días"})
  @IsNumber()
  @IsIn([3, 5, 7, 10, 15])
  @IsPositive()
  executionTime: number;
}
