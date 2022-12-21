import { Injectable, InternalServerErrorException, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { Workii } from '../workiis/entities/workiis.entity';
import { CreateWikiiDto } from '../workiis/dto/create-workiis.dto';
import { UpdateWikiiDto } from '../workiis/dto/update-workiis.dto';
import { v4 as uuidv4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IErrorsTypeORM } from 'src/shared/interfaces/errorsTypeORM.interface';
import { PaginationDto } from 'src/common/DTOs/pagination.dto';
import { Url } from 'src/url/url.entity';
import { nanoid } from 'nanoid';
import { validate as IsUUID } from 'uuid';


@Injectable()
export class WorkiisService {

  count = 1;
  today = new Date();
  private readonly logger = new Logger('WorkiisService');

  constructor(
    @InjectRepository(Workii)
    private readonly workiiRepository: Repository<Workii>,
    /* @InjectRepository(Url)
    private readonly urlRepository: Repository<Url> */
  ){}

  async create(createWikiiDto: CreateWikiiDto) {

    let {name, executionTime, ...restData} = createWikiiDto

    try {
      const workii = this.workiiRepository.create(
        {
          id: uuidv4(),
          name: name.toLocaleLowerCase(),
          ...restData,
          slug: nanoid(10),
          status: 'Busqueda',
          executionTime: 3,
          timeOfCreation: new Date().getTime()
        }
      );
      await this.workiiRepository.save(workii);
      return workii;
      
    } catch (error) {
      
      this.handleExceptions(error)
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

  //TODO: pagination
  findAll(paginationDto: PaginationDto) {
    const { limit= 10, offset= 0 } = paginationDto

    //console.log(paginationDto);
    return this.workiiRepository.find({
      take: limit,
      skip: offset
      // TODO: relaciones
    });
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

    return workii
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

      this.handleExceptions(error)
      
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

  private handleExceptions(error: IErrorsTypeORM) {

  if(error.code === '23505')
      throw new BadRequestException(error.detail);

      this.logger.error(error)
      //console.log(error);
      throw new InternalServerErrorException('Unexpected error, check server logs')
  }
}
