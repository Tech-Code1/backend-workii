import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, OneToMany } from "typeorm";
import { Workii } from '../workiis/entities/workiis.entity';

@Entity({ name: 'users' })
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true,
    })
    email: string;

    @Column('text', {select: false})
    password: string

    @Column('text')
    avatar: string;

    @Column('text')
    nick: string;

    @Column('text', {array: true, name: 'area_of_Expertise'})
    areaOfExpertise: string[];

    @Column('text', {array: true})
    profession: string[];

    @Column('bool', {default: true})
    isActive: boolean;

    @Column('text', {array: true, default: ['user']})
    roles: string[]

    @Column('numeric', {name: 'time_of_creation'})
    timeOfCreation: number;

    @OneToMany(
        () => Workii,
        (workii: Workii) => workii.user,
        {eager: true}
    )
    workiis?: Workii[]
}

