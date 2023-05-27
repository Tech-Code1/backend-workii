import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { PaginationDto } from 'src/common/DTOs/pagination.dto';
import { CommonService } from 'src/common/services/handleExceptions.service';
import { v4 as uuidv4, validate as IsUUID } from 'uuid';
import { Workii } from '../workiis/entities/workiis.entity';
import { CreateUserDto } from './DTOs/create-user.dto';
import { UpdateUserDto } from './DTOs/index.dto';
import { IUser } from './interfaces/user.interface';
import { User } from './users.entity';

@Injectable()
export class UsersService {
	private readonly logger = new Logger('UsersService');

	constructor(
		private authService: AuthService,
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
		@InjectRepository(Workii)
		private readonly workiiRepository: Repository<Workii>,
		private readonly commonServices: CommonService,
		private readonly jwtService: JwtService //private readonly fileInterceptorService: FileInterceptorService
	) {}

	async create(
		{ password, email, avatar, profession, areaOfExpertise, workiis = [], ...usersDetails }: CreateUserDto,
		file: Express.Multer.File
	) {
		email = this.authService.email;

		if (!file) {
			throw new BadRequestException('Make sure that the file is a image');
		}

		//TODO: Cambiar endpoint de las imagenes (Se deberian subir a la nube)
		// Asignar la ruta relativa del avatar
		const backendUrl = 'http://localhost:3000';
		const avatarPath = `/static/avatars/${file.filename}`;
		const fullAvatarUrl = backendUrl + avatarPath;
		avatar = fullAvatarUrl;

		/* if (!bcrypt.compareSync(this.authService.password, password)) {
      throw new HttpException(
        {
          ok: false,
          message: 'La contraseña no es igual a la anterior',
        },
        HttpStatus.BAD_REQUEST,
      );
    } */

		const hashedPassword = await this.authService.hashPassword(password);

		try {
			if (password && email && this.authService.otpMatch) {
				const user = this.userRepository.create({
					id: uuidv4(),
					password: hashedPassword,
					email,
					profession: profession,
					areaOfExpertise: areaOfExpertise,
					...usersDetails,
					workiis: workiis.map((workii: Workii) => {
						return this.workiiRepository.create(workii);
					}),
					avatar,
					timeOfCreation: new Date().getTime()
				});

				await this.userRepository.save(user);
				this.authService.otpIsValid = false;

				return {
					...user,
					workiis,
					token: this.authService.getAccesToken({
						id: user.id,
						isAccessToken: true
					}),
					refreshToken: this.authService.getRefreshToken({
						id: user.id
					})
				};
			}

			throw new BadRequestException('Debes de ingresar tu correo y contraseña antes, o el OTP es erroneo');
		} catch (error) {
			this.commonServices.handleExceptions(error);
		}
	}

	async getUserById(id: string) {
		let user: User | null;

		if (IsUUID(id)) {
			user = await this.userRepository
				.createQueryBuilder('user')
				.leftJoin('user.workiis', 'workiis')
				.addSelect('workiis.id')
				.where('user.id = :id', { id: id })
				.getOne();

			if (!user) throw new NotFoundException(`El usuario con el id ${id} no fue encontrado`);
			return user;
		}
	}

	getAll(paginationDto: PaginationDto) {
		const { limit = 10, offset = 0 } = paginationDto;

		return this.userRepository.find({
			take: limit,
			skip: offset,
			relations: {
				workiis: true
			}
		});
	}

	excludeWorkiis(user: User): Partial<User> {
		const { workiis, ...userWithoutWorkiis } = user;
		return userWithoutWorkiis;
	}

	async update(id: string, updateUserDto: UpdateUserDto) {
		const user = await this.userRepository.findOne({
			where: { id: id }
		});

		if (!user) {
			throw new NotFoundException(`El usuario con el id ${id} no fue encontrado`);
		}

		// Excluir la propiedad workiis del updateUserDto
		const { workiis, ...updateUserDtoWithoutWorkiis } = updateUserDto;

		// Asignar el updateUserDto sin la propiedad workiis al objeto user
		const updatedUser = Object.assign(user, updateUserDtoWithoutWorkiis);

		try {
			await this.userRepository.save(updatedUser);
			return this.excludeWorkiis(updatedUser);
		} catch (error) {
			this.commonServices.handleExceptions(error);
		}
	}

	delete(id: string) {
		/* const user = this.getUserById(id);
        this.users = this.users.filter(user => user.id !== id); */
	}

	/* no production */
	fillUsersWithSeedData(user: IUser[]) {
		//this.users = user;
	}
}
