import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  Column,
} from 'typeorm';
import { Workii } from '../../workiis/entities/workiis.entity';
import { User } from '../../users/users.entity';

@Entity({ name: 'aplication_workii' })
export class AplicationWorkii {
  @ApiProperty({
    example: '40a16f5d-f42c-49df-8998-edb2b4ff465a',
    description: 'Id de la aplicación a los workiis',
    uniqueItems: true,
    required: false,
    type: String,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Workii)
  @JoinColumn({ name: 'workii_id' })
  workii: Workii;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ApiProperty({
    example: Date.now(),
    description: 'Fecha en la que el usuario aplico al workii',
    uniqueItems: false,
    required: false,
    type: Date,
  })
  @Column('numeric', { name: 'application_date' })
  applicationDate: number;

  @ApiProperty({
    example: Date.now(),
    description:
      'Fecha en la que el dueño del workki da una respuesta al usuario que aplico',
    uniqueItems: false,
    required: false,
    type: Date,
  })
  @Column('numeric', { name: 'response_date' })
  responseDate: number;

  @ApiProperty({
    example: 'Busqueda',
    description: 'Estado del workii',
  })
  @Column('text', {
    default: 'Has aplicado al workii correctamente',
    name: 'response_message',
  })
  responseMessage: string;

  @ApiProperty({
    example: true,
    description: 'Usuario activo o eliminado',
    uniqueItems: false,
    default: true,
    required: false,
    type: Boolean,
  })
  @Column('bool', { default: false })
  selected: boolean;

  @ApiProperty({
    example: 'Pendiente | Aceptado | Rechazado',
    description: 'Estado en el que se encuentra la aplicación del workii',
  })
  @Column('text', { default: 'Pendiente' })
  status: string;
}
