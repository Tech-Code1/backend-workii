import { Injectable, InternalServerErrorException, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { Workii } from '../workiis/entities/workiis.entity';
import { CreateWikiiDto } from '../workiis/dto/create-workiis.dto';
import { UpdateWikiiDto } from '../workiis/dto/update-workiis.dto';
import { v4 as uuidv4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IErrorsTypeORM } from 'src/shared/interfaces/errorsTypeORM.interface';


@Injectable()
export class WorkiisService {

  count = 1;
  today = new Date();
  private readonly logger = new Logger('WorkiisService');

  constructor(
    @InjectRepository(Workii)
    private readonly workiiRepository: Repository<Workii>
  ){}

  async create(createWikiiDto: CreateWikiiDto) {

    let {name, executionTime, ...restData} = createWikiiDto
    try {
      const workii = this.workiiRepository.create(
        {
          id: uuidv4(),
          name: name.toLocaleLowerCase(),
          ...restData,
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
  findAll() {
    return this.workiiRepository.find({});
  }

  async findOne(id: string) {

    const workii = await this.workiiRepository.findOneBy({id});

    if (!workii) 
    throw new NotFoundException(`El workii con el id ${id} no fue encontrado`)

    return workii
  }

  update(id: string, updateWikiiDto: UpdateWikiiDto) {
    //const {cost, description, executionTime, name, target, toDoList} = updateWikiiDto

    /* let workiiDB = this.findOne(id);

    this.workiis = this.workiis.map( workii => {
      if(workii.id === id) {
        workiiDB = {...workiiDB, ...updateWikiiDto}
        return workiiDB
      }
      return workiiDB
    }) */
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
