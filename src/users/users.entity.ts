import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    email: string;

    @Column('text')
    password: string

    @Column('text')
    avatar: string;

    @Column('text')
    nick: string;

    @Column('text', {array: true, name: 'area_of_Expertise'})
    areaOfExpertise: string[];

    @Column('text', {array: true})
    profession: string[];

    @Column('numeric', {name: 'time_of_creation'})
    timeOfCreation: number;
}

