import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';
import { Workii } from './workii.entity';

@Entity({ name: 'aplication_workii' })
export class ApplicationWorkii extends BaseEntity {
	@ApiProperty({
		example: '40a16f5d-f42c-49df-8998-edb2b4ff465a',
		description: 'Id de la aplicación a los workiis',
		uniqueItems: true,
		required: false,
		type: String
	})
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@ManyToOne(() => Workii, (workii) => workii.applicationWorkiis)
	@JoinColumn({ name: 'workii_id', referencedColumnName: 'id' })
	workii: string;

	@ManyToOne(() => User, (user) => user.applicationWorkiis)
	@JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
	user: string;

	@ApiProperty({
		example: Date.now(),
		description: 'Fecha en la que el usuario aplico al workii',
		uniqueItems: false,
		required: false,
		type: Number
	})
	@Column('numeric', { name: 'application_date' })
	applicationDate: number;

	@ApiProperty({
		example: 'dd/MM/yyyy',
		description: 'Fecha en la que el dueño del workki da una respuesta al usuario que aplico',
		uniqueItems: false,
		required: false,
		default: Date.now(),
		type: Date
	})
	@Column('numeric', { name: 'response_date', nullable: true })
	responseDate: Date;

	@ApiProperty({
		example: 'Has aplicado al workii correctamente',
		description: 'Mensaje que se le da al usuario al haber aplicado a un workii'
	})
	@Column('text', {
		default: 'Has aplicado al workii correctamente',
		name: 'response_message'
	})
	responseMessage: string;

	@ApiProperty({
		example: true,
		description: 'Usuario activo o eliminado',
		uniqueItems: false,
		default: true,
		required: false,
		type: Boolean
	})
	@Column('bool', { default: false })
	selected: boolean;

	@ApiProperty({
		example: 'Pendiente | Aceptado | Rechazado',
		description: 'Estado en el que se encuentra la aplicación del workii'
	})
	@Column('text', { default: 'Pendiente' })
	status: string;
}
