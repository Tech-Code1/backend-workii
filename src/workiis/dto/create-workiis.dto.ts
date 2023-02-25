import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsIn,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  Matches,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { User } from 'src/users/users.entity';
import { Etarget } from '../interfaces/target.interface';

export class CreateWorkiiDto {
  @ApiProperty({
    description: 'Titulo del workii',
    uniqueItems: false,
    required: true,
    nullable: false,
  })
  @MaxLength(150, {
    message: 'El campo excede el número de caracteres permitidos',
  })
  @MinLength(1, { message: 'El campo no puede estar vacio' })
  @IsString({ message: `El correo debe ser un string` })
  name: string;

  @ApiProperty({
    description: 'Tipo de publico al que va destinado el workii',
    uniqueItems: false,
    default: [],
    required: true,
    enum: Etarget,
    nullable: false,
  })
  @IsIn(
    [
      'Arte',
      'Informatica',
      'Humanidades',
      'Ciencias',
      'Ingenieria',
      'Entretenimiento',
      'Comunicaciones',
      'Marketing',
      'Otro',
    ],
    { each: true },
  )
  @IsString({ each: true })
  target: string;

  @ApiProperty({
    description: 'Tipo de publico al que va destinado el workii',
    uniqueItems: false,
    required: true,
    nullable: false,
  })
  @MaxLength(300, {
    message: 'El campo excede el número de caracteres permitidos',
  })
  @MinLength(1, { message: 'El campo no puede estar vacio' })
  @IsString()
  description: string;

  @ApiProperty({
    description:
      'Lista de tareas que la persona tiene que realizar para compeltar el workii',
    uniqueItems: false,
    default: [],
    required: true,
    nullable: false,
  })
  @MaxLength(150, {
    each: true,
    message: 'El campo excede el número de caracteres permitidos',
  })
  @MinLength(1, { each: true, message: 'El campo tareas no puede estar vacio' })
  @IsString({ each: true })
  @IsArray()
  toDoList: string[];

  @ApiProperty({
    description: 'Costo que el usuario esta dispuesto pagar por el workii',
    uniqueItems: false,
    default: 0,
    required: true,
    nullable: false,
  })
  @Min(1, {
    message: 'El minimo costo de un Workii no puede ser inferior a 1 dolar',
  })
  @Max(1000000, {
    message: 'El campo excede el costo de lo que puede costar un Workii',
  })
  @IsNumber()
  cost: number;

  @ApiProperty({
    description: 'Link del workii para compartir',
    uniqueItems: true,
    required: false,
    nullable: false,
  })
  @IsString()
  @MaxLength(30, {
    message: 'El campo excede el número de caracteres permitidos',
  })
  @Matches(
    /^(?:[a-zA-ZñÑ0-9]+(?:[ _-][a-zA-ZñÑ0-9]+)*)(?:[ ]{1}(?:[a-zA-ZñÑ0-9]+(?:[ _-][a-zA-ZñÑ0-9]+)*))*$/,
    { message: 'El formato del slug es incorrecto' },
  )
  @IsOptional()
  slug?: string;

  @ApiProperty({
    enum: [
      { id: 1, status: 'Busqueda' },
      { id: 2, status: 'Eligiendo' },
      { id: 3, status: 'Iniciado' },
      { id: 4, status: 'Finalizado' },
    ],
    description: 'Estado del workii',
    uniqueItems: false,
    default: 'Busqueda',
    required: false,
    nullable: false,
  })
  @IsString()
  @IsOptional()
  @IsIn(['Busqueda', 'Eligiendo', 'Iniciado', 'Finalizado'])
  status?: string;

  //TODO: se debe eliminar este campo y hacer la consulta en la relación del usuario para crear el workii
  @IsString()
  @IsUUID()
  userId: string;

  @ApiProperty({
    description: 'Tiempo en el que se tiene que completar el workii',
    uniqueItems: false,
    default: null,
    required: true,
    nullable: false,
  })
  @Min(3, { message: 'El tiempo minimo para cumplir la tarea es de 3 días' })
  @Max(15, { message: 'El tiempo minimo para cumplir la tarea es de 15 días' })
  @IsNumber()
  @IsIn([3, 5, 7, 10, 15])
  @IsPositive()
  executionTime: number;
}
