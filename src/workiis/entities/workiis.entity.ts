import { NotFoundException } from "@nestjs/common";
import { throwError } from "rxjs";
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { Url } from '../../url/url.entity'

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

    @Column('text', {array: true, name: 'to_do_list'})
    toDoList: string[];

    @Column('float')
    cost: number;

    @Column('text', {default: "Busqueda"})
    status: string;

    @Column('numeric', {default: 0})
    applications?: number;

    @Column('numeric', {name: 'execution_time'})
    executionTime: number;

    @Column('text', {
      unique: true,
    })
    slug: string;

    @Column('numeric', {name: 'time_of_creation'})
    timeOfCreation: number;

    @Column('numeric', {default: 0, name: 'time_of_finished'})
    timeOfFinished?: number;

    /* @OneToOne(() => Url)
    @JoinColumn({name: 'url_id'})
    url: Url */
}

