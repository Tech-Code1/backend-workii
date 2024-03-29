import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EValidRoles } from '../interfaces/interfaces.entities';
import { ApplicationWorkii } from './application_workii.entity';
import { BaseEntity } from './base.entity';
import { Workii } from './workii.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity {
	@ApiProperty({
		example: 'ef549097-0214-43bb-9cce-ff1390e76d02',
		description: 'Id del usuario',
		uniqueItems: true,
		required: false,
		type: String
	})
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@ApiProperty({
		example: 'jhondoe@hotmail.com',
		description: 'Correo del usuario'
	})
	@Column('text', {
		unique: true
	})
	email: string;

	@ApiProperty({
		example: '123456',
		description: 'Contraseña del usuario'
	})
	@Column('text', { select: false })
	password: string;

	@ApiProperty({
		example: 'http://example.img',
		description: 'Avatar del usuario'
	})
	@Column('text')
	avatar: string;

	@ApiProperty({
		example: 'jhonDoe',
		description: 'Apodo del usuario'
	})
	@Column('text', { unique: true })
	nick: string;

	@ApiProperty({
		example: 'Informatica',
		description: 'Area en el que se especializa el usuario'
	})
	@Column('text', { name: 'area_of_Expertise' })
	areaOfExpertise: string;

	@ApiProperty({
		example: 'Arte',
		description: 'Profesion del usuario'
	})
	@Column('text')
	profession: string;

	@ApiProperty({
		example: true,
		description: 'Usuario activo o eliminado',
		uniqueItems: false,
		default: true,
		required: false,
		type: Boolean
	})
	@Column('bool', { default: true })
	isActive: boolean;

	@ApiProperty({
		example: 'user',
		description: 'Roles del usuario',
		uniqueItems: false,
		default: ['user'],
		required: false,
		enum: EValidRoles,
		isArray: true
	})
	@Column('text', { array: true, default: ['user'] })
	roles: string[];

	@ApiProperty({
		example: Date.now(),
		description: 'Fecah de la creación del usuario',
		uniqueItems: false,
		required: false,
		type: Number
	})
	@Column('numeric', { name: 'time_of_creation' })
	timeOfCreation: number;

	@OneToMany(() => Workii, (workii: Workii) => workii.user, { eager: true })
	workiis?: Workii[];

	@OneToMany(() => ApplicationWorkii, (application: ApplicationWorkii) => application.user)
	applicationWorkiis: ApplicationWorkii[];
}
