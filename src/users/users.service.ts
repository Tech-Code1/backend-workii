import { join } from 'path';
import { existsSync } from 'fs';

import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { v4 as uuidv4 } from 'uuid';
import { IUser } from './interfaces/user.interface';
import { AuthService } from 'src/auth/auth.service';
import { UpdateUserDto } from './DTOs/index.dto';
import { User } from './users.entity';
import { CommonService } from 'src/common/services/handleExceptions.service';
import { CreateUserDto } from './DTOs/create-user.dto';
import { Workii } from '../workiis/entities/workiis.entity';
import { PaginationDto } from 'src/common/DTOs/pagination.dto';
import { validate as IsUUID } from 'uuid';
import { JwtService } from '@nestjs/jwt';



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
        private readonly jwtService: JwtService
        //private readonly fileInterceptorService: FileInterceptorService  
        ) {}

    async create({password, email, avatar, workiis = [], ...usersDetails}: CreateUserDto, file: Express.Multer.File) {
        
        password = this.authService.password
        email = this.authService.email

        if(!file) {
            throw new BadRequestException('Make sure that the file is a image')
        }
        
        //TODO: Cambiar endpoint de las imagenes (Se deberian subir a la nube)
        avatar = join(__dirname, '../../static/avatars', file.filename);
    
        if( !existsSync(avatar) ) {
          throw new BadRequestException(`Not product found with image ${file.filename}`);
        }
        
        const hashedPassword = await this.authService.hashPassword(password);

        try {
            if(password && email && this.authService.otpMatch) {
            const user = this.userRepository.create(
                {
                    id: uuidv4(),
                    password: hashedPassword,
                    email,
                    ...usersDetails,
                    workiis: workiis.map((workii: Workii) => {
                       return this.workiiRepository.create(workii)
                    }),
                    avatar,
                    timeOfCreation: new Date().getTime()
                }
            )

                await this.userRepository.save(user)
                this.authService.otpIsValid = false

                return {...user, workiis, token: this.authService.getJwtToken( {email: user!.email} )};

        }

        throw new BadRequestException("Debes de ingresar tu correo y contraseña antes, o el OTP es erroneo");


        } catch (error) {

            this.commonServices.handleExceptions(error)

        }
    }

    async getUserById(id: string) {
        let user: User | null;

        if(IsUUID(id)) {
        user = await this.userRepository.findOneBy({ id: id })

        if (!user) 
        throw new NotFoundException(`El workii con el id ${id} no fue encontrado`)

        return user

        } 
    }

    getAll(paginationDto: PaginationDto) {
        const { limit= 10, offset= 0 } = paginationDto

        return this.userRepository.find({
        take: limit,
        skip: offset,
        relations: {
            workiis: true
        }
        });
    }

    async update(id: string, updateUserDto: UpdateUserDto) {

        const user = await this.userRepository.preload({
            id: id,
            ...updateUserDto
          })
      
          if(!user) {
            throw new NotFoundException(`El usuario con el id ${id} no fue encontrado`)
          }
      
          try {
            
            await this.userRepository.save(user)
            return user;
      
          } catch (error) {
      
            this.commonServices.handleExceptions(error)
            
          }
    }

    delete(id: string) {
        /* const user = this.getUserById(id);
        this.users = this.users.filter(user => user.id !== id); */
    }

    /* no production */
    fillUsersWithSeedData(user: IUser[]){
        //this.users = user;
    }
}
