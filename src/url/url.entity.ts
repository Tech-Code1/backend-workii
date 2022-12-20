import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Workii } from 'src/workiis/entities/workiis.entity';

@Entity()
export class Url {
    /* @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'url_code'})
    urlCode: string;

    @Column({name: 'long_url'})
    longUrl: string;

    @Column({name: 'short_url'})
    shortUrl: string; */

    /* @OneToOne(() => Workii, (workii) => workii.url)
    workii: Workii */
}