import { NotFoundException } from "@nestjs/common";
import { throwError } from "rxjs";
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

let counter = 1;
@Entity()
export class Workii {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    name: string;

    @Column('text', {array: true})
    target: string[]

    @Column('text')
    description: string;

    @Column('text', {array: true})
    toDoList: string[];

    @Column('float')
    cost: number;

    @Column('text', {default: "Busqueda"})
    status: string;

    @Column('numeric', {default: 0})
    applications?: number;

    /* @Column({
      type: 'text',
      unique: true,
    })
    slug: string; */

    @Column('numeric')
    executionTime: number;

    @Column('numeric')
    timeOfCreation: number;

    @Column('numeric', {default: 0})
    timeOfFinished?: number;
}

