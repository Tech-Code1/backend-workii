import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/DTOs/pagination.dto';
import { Repository } from 'typeorm';
import { UpdateApplicationWorkiiDto } from './dto/update-application_workii.dto';
import { validate as IsUUID } from 'uuid';
import { CommonService } from 'src/common/services/handleExceptions.service';
import { ApplicationWorkii } from './entities/application_workii.entity';

@Injectable()
export class ApplicationWorkiiService {
  constructor(
    @InjectRepository(ApplicationWorkii)
    private readonly applicationWorkiiRepository: Repository<ApplicationWorkii>,
    private readonly commonServices: CommonService,
  ) {}

  /* create(createAplicationWorkiiDto: CreateAplicationWorkiiDto) {
    return 'This action adds a new aplicationWorkii';
  } */

  findAllApplicationsWorkiiByWorkii(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    return this.applicationWorkiiRepository
      .createQueryBuilder('aplication_workii')
      .leftJoinAndSelect('aplication_workii.workii', 'workii')
      .select(['workii', 'workii.id'])
      .take(limit)
      .skip(offset)
      .getMany();
  }

  findAllApplicationsWorkiiByUser(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    return this.applicationWorkiiRepository
      .createQueryBuilder('aplication_workii')
      .leftJoinAndSelect('aplication_workii.workii', 'user')
      .select(['user', 'user.id'])
      .take(limit)
      .skip(offset)
      .getMany();
  }

  async findByApplicationId(id: string) {
    let aplicationWorkii: ApplicationWorkii | null;

    if (IsUUID(id)) {
      aplicationWorkii = await this.applicationWorkiiRepository.findOneBy({
        id,
      });
    } else {
      const queryBuilder =
        this.applicationWorkiiRepository.createQueryBuilder();
      aplicationWorkii = await queryBuilder
        .where('id =:id', {
          id: id,
        })
        .getOne();
    }

    if (!aplicationWorkii)
      throw new NotFoundException(
        `Las aplicaciones con el id: ${id} no fueron encontradas`,
      );

    return aplicationWorkii;
  }

  async update(
    id: string,
    {
      status,
      responseMessage,
      selected,
      responseDate,
    }: UpdateApplicationWorkiiDto,
  ) {
    const aplicationWorkii = await this.applicationWorkiiRepository.preload({
      id: id,
      status,
      responseMessage,
      selected,
      responseDate,
    });

    if (!aplicationWorkii) {
      throw new NotFoundException(
        `Las aplicaciones con el id: ${id} no fue encontrado`,
      );
    }

    try {
      await this.applicationWorkiiRepository.save(aplicationWorkii);
      return aplicationWorkii;
    } catch (error) {
      this.commonServices.handleExceptions(error);
    }
  }

  async remove(id: string) {
    const applicationWorkii = await this.applicationWorkiiRepository.findOneBy({
      id,
    });

    if (applicationWorkii !== null) {
      await this.applicationWorkiiRepository.remove(applicationWorkii);
    } else {
      throw new NotFoundException(
        `El workii con el id ${id} no fue encontrado`,
      );
    }
  }
}
