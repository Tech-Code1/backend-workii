import { Injectable, InternalServerErrorException, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { Workii } from '../workiis/entities/workiis.entity';
import { CreateWorkiiDto } from '../workiis/dto/create-workiis.dto';
import { UpdateWikiiDto } from '../workiis/dto/update-workiis.dto';
import { v4 as uuidv4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IErrorsTypeORM } from 'src/shared/interfaces/errorsTypeORM.interface';
import { PaginationDto } from 'src/common/DTOs/pagination.dto';
import { Url } from 'src/url/url.entity';
import { nanoid } from 'nanoid';
import { validate as IsUUID } from 'uuid';
import { CommonService } from '../common/common.service';
import { User } from 'src/users/users.entity';


@Injectable()
export class WorkiisService {

  count = 1;
  today = new Date();
  private readonly logger = new Logger('WorkiisService');

  constructor(
    @InjectRepository(Workii)
    private readonly workiiRepository: Repository<Workii>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly commonServices: CommonService
    /* @InjectRepository(Url)
    private readonly urlRepository: Repository<Url> */
  ){}

  async create({name, executionTime, userId, ...restData}: CreateWorkiiDto) {

    try {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    
    if (!user) {
      throw new Error(`El usuario con id ${userId} no fue encontrado`);
    }
  
      const workii = this.workiiRepository.create(
        {
          id: uuidv4(),
          name: name.toLocaleLowerCase(),
          ...restData,
          slug: nanoid(10),
          status: 'Busqueda',
          executionTime: 3,
          timeOfCreation: new Date().getTime(),
          user: user,
        }
      );

      await this.workiiRepository.save(workii);

      const result = await this.workiiRepository
      .createQueryBuilder('workii')
      .where('workii.id = :id', { id: workii.id })
      .leftJoinAndSelect('workii.user', 'user')
      .select(['workii', 'user.id'])
      .getOne();

      return result;
      
    } catch (error) {
      
       this.commonServices.handleExceptions(error)
    }
  }

/* timelImit(days: number): number {

    let dataInitial: Date = new Date()

    if (typeof days === 'number' && days > 0) {

        if(days === 3 || days === 5 || days === 7 || days === 10 || days === 15) {

            return dataInitial.setDate(dataInitial.getDate() + days)

        }
            
        return  dataInitial.setDate(dataInitial.getDate() + 3)
    } 

    throw new NotFoundException("Los días ingresados son invalidos");
} */

  findAll(paginationDto: PaginationDto) {
    const { limit= 10, offset= 0 } = paginationDto
    
    return this.workiiRepository
    .createQueryBuilder('workii')
    .leftJoinAndSelect('workii.user', 'user')
    .select(['workii', 'user.id'])
    .take(limit)
    .skip(offset)
    .getMany()
  }
  
  async findOne(code: string) {
    
    let workii: Workii | null;
    
    if(IsUUID(code)) {
      workii = await this.workiiRepository.findOneBy({ id: code })

    } else {

      const queryBuilder = this.workiiRepository.createQueryBuilder();
      workii = await queryBuilder
      .where('slug =:slug', {
        slug: code
      }).getOne();
    }

    if (!workii) 
    throw new NotFoundException(`El workii con el id ${code} no fue encontrado`)

    const result = await this.workiiRepository
      .createQueryBuilder('workii')
      .leftJoinAndSelect('workii.user', 'user')
      .select(['workii', 'user.id'])
      .getOne();

    return result
  }

  async update(id: string, updateWikiiDto: UpdateWikiiDto) {
    const workii = await this.workiiRepository.preload({
      id: id,
      ...updateWikiiDto
    })

    if(!workii) {
      throw new NotFoundException(`El workii con el id ${id} no fue encontrado`)
    }

    try {
      
      await this.workiiRepository.save(workii)
      return workii;

    } catch (error) {

      this.commonServices.handleExceptions(error)
      
    }


  }

  async remove(id: string) {
    const workii = await this.workiiRepository.findOneBy({id});

    if(workii !== null) {

      await this.workiiRepository.remove(workii);

    } else {
      throw new NotFoundException(`El workii con el id ${id} no fue encontrado`)
    }
  }

  /* no production */
  fillWorkiisWithSeedData(workii: Workii[]){
    //this.workiis = workii;
}

}
