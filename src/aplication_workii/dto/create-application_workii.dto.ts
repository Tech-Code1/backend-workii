import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Workii } from 'src/workiis/entities/workiis.entity';
import { EStatus } from '../interface/status.interface';
import { User } from '../../users/users.entity';

export class CreateApplicationWorkiiDto {
  @ApiProperty({
    description: 'Id del workii',
    uniqueItems: true,
    required: true,
    nullable: false,
  })
  @IsString()
  @IsUUID()
  readonly workii: Workii;

  @ApiProperty({
    description: 'Id del usuario',
    uniqueItems: true,
    required: true,
    nullable: false,
  })
  @IsString()
  @IsUUID()
  readonly user: User;

  @ApiProperty({
    description: 'Mensaje de respuesta al usuario que aplico al workii',
    uniqueItems: false,
    required: false,
    nullable: true,
  })
  @MinLength(0, { message: 'El campo debe tener por lo menos 6 caracteres' })
  @MaxLength(300, {
    message: 'El campo excede el número de caracteres permitidos',
  })
  @IsString({ message: `El mensaje debe ser un string` })
  @IsOptional()
  readonly responseMessage: string;

  @ApiProperty({
    example: 'dd/mm/yyyy',
    description:
      'Fecha de respuesta del creador del workii al usuario que aplico',
    uniqueItems: false,
    required: false,
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  responseDate: number;

  @ApiProperty({
    example: 'dd/mm/yyyy',
    description: 'Estado de selección del usuario que aplico a un workii',
    uniqueItems: false,
    required: true,
    default: false,
    type: Boolean,
  })
  @IsBoolean()
  @IsOptional()
  selected: boolean;

  @ApiProperty({
    description: 'Estatus del usuario que ha aplicado al workii',
    uniqueItems: false,
    required: true,
    enum: EStatus,
    nullable: false,
  })
  @IsString({
    message: `El estatus debe ser un string`,
  })
  readonly status: string;
}
