import { NotFoundException } from "@nestjs/common";
import { ApiProperty, ApiQuery } from "@nestjs/swagger";
import { throwError } from "rxjs";
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { Url } from '../../url/url.entity'
import { User } from '../../users/users.entity';
import { ArrayMaxSize } from 'class-validator';
import { Etarget } from '../interfaces/target.interface';

let counter = 1;
@Entity({ name: 'workiis' })
export class Workii {

    @ApiProperty({
      example: 'eb814114-392a-4b86-8b65-dff95939817e',
      description: 'Id del workii',
      uniqueItems: true,
      required: false
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
      example: 'Necesito ilustración para la portada de un libro',
      description: 'Titulo del workii',
    })
    @Column('text')
    name: string;

    @ApiProperty({
      example: ['Arte', 'Ingenieria'],
      description: 'Tipo de publico al que va destinado el workii',
    })
    @Column('text', {array: true})
    target: string[]

    @ApiProperty({
      example: 'Lorem ipsum dolor sit amet, consectetur adip',
      description: 'Tipo de publico al que va destinado el workii',
    })
    @Column('text')
    description: string;

    @ApiProperty({
      example: ['Hacer la ilustración en digital', 'En la ilustración deberia aparecer 2 personajes'],
      description: 'Lista de tareas que la persona tiene que realizar para compeltar el workii',
    })
    @Column('text', {array: true, name: 'to_do_list'})
    toDoList: string[];

    @ApiProperty({
      example: 100,
      description: 'Costo que el usuario esta dispuesto pagar por el workii',
    })
    @Column('float')
    cost: number;

    @ApiProperty({
      example: "Busqueda",
      description: 'Estado del workii',
    })
    @Column('text', {default: "Busqueda"})
    status: string;

    @ApiProperty({
      example: 5,
      description: 'Número de personas que han aplicado al workii',
      uniqueItems: false,
      default: 0,
      required: false,
      enum: Etarget,
      type: Number,
    })
    @Column('numeric', {default: 0})
    applications?: number;

    @ApiProperty({
      example: 3,
      description: 'Tiempo en el que se tiene que completar el workii',
    })
    @Column('numeric', {name: 'execution_time'})
    executionTime: number;

    @ApiProperty({
      example: 'http://localhost:3000/IvkuCBX61u',
      description: 'Enlace customizable para compartir el workii',
      uniqueItems: true,
      required: true,
      type: String,
    })
    @Column('text', {
      unique: true,
    })
    slug: string;

    @ApiProperty({
      example: Date.now(),
      description: 'Fecha de creación del workii',
      uniqueItems: false,
      required: false,
      type: Date,
    })
    @Column('numeric', {name: 'time_of_creation'})
    timeOfCreation: number;

    @ApiProperty({
      description: 'Tiempo en el que se finaliza el workii',
      uniqueItems: false,
      default: null,
      required: false,
      type: Date,
    })
    @Column('numeric', {default: 0, name: 'time_of_finished'})
    timeOfFinished?: number;

    @ManyToOne(
      () => User,
      (user: User) => user.workiis,
    )
    user?: User
}

