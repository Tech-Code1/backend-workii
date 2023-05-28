/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
import { nanoid } from 'nanoid';
import { CreateApplicationWorkiiDto } from 'src/aplication_workii/dto/create-application_workii.dto';
import { ApplicationWorkii } from 'src/aplication_workii/entities/application_workii.entity';
import { PaginationDto } from 'src/common/DTOs/pagination.dto';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4, validate as IsUUID } from 'uuid';
import { CommonService } from '../common/services/handleExceptions.service';
import { CreateWorkiiDto } from '../workii/dto/create-workii.dto';
import { UpdateWikiiDto } from '../workii/dto/update-workii.dto';
import { Workii } from '../workii/entities/workii.entity';

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
		@InjectRepository(ApplicationWorkii)
		private readonly applicationWorkiiRepository: Repository<ApplicationWorkii>,
		private readonly commonServices: CommonService /* @InjectRepository(Url)
    private readonly urlRepository: Repository<Url> */
	) {}

	async create({ name, executionTime, userId, ...restData }: CreateWorkiiDto) {
		try {
			const user = await this.userRepository.findOne({ where: { id: userId } });

			if (!user) {
				throw new Error(`El usuario con id ${userId} no fue encontrado`);
			}

			const workii = this.workiiRepository.create({
				id: uuidv4(),
				name: name.toLocaleLowerCase(),
				...restData,
				slug: nanoid(10),
				status: 'Busqueda',
				executionTime: executionTime,
				timeOfCreation: new Date().getTime(),
				user: user
			});

			await this.workiiRepository.save(workii);

			const result = await this.workiiRepository
				.createQueryBuilder('workii')
				.where('workii.id = :id', { id: workii.id })
				.leftJoinAndSelect('workii.user', 'user')
				.select(['workii', 'user.id'])
				.getOne();

			return result;
		} catch (error) {
			this.commonServices.handleExceptions(error);
		}
	}

	async applicationWorkii(
		workiiId: string,
		userId: string,
		res: Response,
		{ workii, user, ...rest }: CreateApplicationWorkiiDto
	) {
		try {
			const workiiFindId = await this.workiiRepository
				.createQueryBuilder('workii')
				.where('workii.id =:id', { id: workiiId })
				.leftJoinAndSelect('workii.user', 'user')
				.select(['workii.id', 'workii.applications', 'user.id'])
				.getOne();

			const userFindId = await this.userRepository
				.createQueryBuilder('user')
				.where('user.id =:id', { id: userId })
				.select(['user.id'])
				.getOne();

			if (!workiiFindId?.id || !workiiFindId?.user?.id) {
				res.status(400).json({
					message: 'El workii con el id solicitado no se encuentra'
				});
				throw new BadRequestException();
			}

			if (workiiFindId?.user?.id !== userFindId?.id) {
				const applicationWorkii = this.applicationWorkiiRepository.create({
					id: uuidv4(),
					applicationDate: new Date().getTime(),
					user: userId,
					workii: workiiId,
					...rest
				});

				const application = await this.applicationWorkiiRepository
					.createQueryBuilder('applications')
					.select(['applications.id', 'user.id', 'workii.id'])
					.where('applications.user =:user', { user: userId })
					.andWhere('applications.workii =:workii', { workii: workiiId })
					.leftJoin('applications.user', 'user')
					.leftJoin('applications.workii', 'workii')
					.getOne();

				if (!application) {
					const result = await this.applicationWorkiiRepository.save(applicationWorkii);
					if (result && workiiFindId.applications) {
						const currentApplications = Number(workiiFindId.applications);
						const addApplication: number = currentApplications + 1;

						await this.workiiRepository.update(workiiFindId.id, {
							applications: addApplication
						});
					}

					res.status(201).json({
						message: 'has aplicado al workii de manera correcta',
						user: userId,
						workii: workiiId
					});
				} else {
					res.status(400).json({
						message: 'El usuario no puede aplicar 2 veces al mismo workii'
					});
				}
			} else {
				res.status(400).json({
					message: 'El usuario que ha creado el workii no puede aplicar a su propio workii'
				});
			}
		} catch (error) {
			res.status(500).json({
				message: 'La petición tiene un error o no es valida'
			});
			this.commonServices.handleExceptions(error);
		}
	}

	async searchWorkiis(
		searchTerm: string,
		limit: number,
		offset: number
	): Promise<{ workiis: Workii[]; totalSearchResults: number }> {
		try {
			const workiis = await this.workiiRepository
				.createQueryBuilder('workii')
				.where('LOWER(workii.name) LIKE LOWER(:searchTerm)', {
					searchTerm: `%${searchTerm}%`
				})
				.leftJoinAndSelect('workii.user', 'user')
				.select(['workii', 'user.id'])
				.take(limit) // Limitar la cantidad de resultados
				.skip(offset) // Comenzar desde un índice específico
				.getMany();

			const totalSearchResults = await this.workiiRepository
				.createQueryBuilder('workii')
				.where('LOWER(workii.name) LIKE LOWER(:searchTerm)', {
					searchTerm: `%${searchTerm}%`
				})
				.getCount();

			return { workiis: workiis || [], totalSearchResults };
		} catch (error) {
			return { workiis: [], totalSearchResults: 0 };
		}
	}

	async removeApplication(id: string, workii: string, res: Response) {
		const application = await this.applicationWorkiiRepository.findOneBy({
			id
		});

		if (application !== null) {
			await this.applicationWorkiiRepository.remove(application);

			const workiiFindId = await this.workiiRepository
				.createQueryBuilder('workii')
				.where('workii.id =:id', { id: workii })
				.leftJoinAndSelect('workii.user', 'user')
				.select(['workii.id', 'workii.applications', 'user.id'])
				.getOne();

			if (workiiFindId) {
				const currentApplications = Number(workiiFindId.applications);
				const addApplication: number = currentApplications - 1;

				await this.workiiRepository.update(workiiFindId.id, {
					applications: addApplication
				});

				res.status(200).json({
					message: 'Has abadonado el workii de manera correcta'
				});
			}
		} else {
			res.status(404).json({
				message: `Algo inesperado ha ocurrido`
			});
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

	async findAll({ limit, offset }: PaginationDto) {
		try {
			const workiis = await this.workiiRepository
				.createQueryBuilder('workii')
				.leftJoinAndSelect('workii.user', 'user')
				.select(['workii', 'user.id'])
				.take(limit)
				.skip(offset)
				.getMany();

			const totalResults = await this.workiiRepository.createQueryBuilder('workii').getCount();

			return { workiis, totalResults };
		} catch (error) {
			return { workiis: [], totalResults: 0 };
		}
	}

	async findOne(code: string) {
		let workii: Workii | null;

		if (IsUUID(code)) {
			workii = await this.workiiRepository.findOneBy({ id: code });
		} else {
			const queryBuilder = this.workiiRepository.createQueryBuilder('workii');
			workii = await queryBuilder
				.where('slug =:slug', { slug: code })
				.select(['workii', 'user.id'])
				.leftJoin('workii.user', 'user')
				.getOne();
		}

		if (!workii) throw new NotFoundException(`El workii con el id ${code} no fue encontrado`);

		return workii;
	}

	async update(id: string, updateWikiiDto: UpdateWikiiDto) {
		const workii = await this.workiiRepository.preload({
			id: id,
			...updateWikiiDto
		});

		if (!workii) {
			throw new NotFoundException(`El workii con el id ${id} no fue encontrado`);
		}

		try {
			await this.workiiRepository.save(workii);
			return workii;
		} catch (error) {
			this.commonServices.handleExceptions(error);
		}
	}

	async deleteWorkii(id: string, res: Response) {
		const workii = await this.workiiRepository.findOneBy({ id });

		if (workii !== null) {
			await this.workiiRepository.remove(workii);
			res.status(200).json({
				message: 'Has eliminado el workii de manera correcta'
			});
		} else {
			res.status(404).json({
				message: 'Algo inesperado ha ocurrido, el workii no pudo ser eliminado'
			});
			throw new NotFoundException(`Algo inesperado ha ocurrido, el workii no pudo ser eliminado`);
		}
	}

	/* no production */
	/* fillWorkiisWithSeedData(workii: Workii[]) {
    //this.workiis = workii;
  } */
}
