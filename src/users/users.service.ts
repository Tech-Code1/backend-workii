import { Injectable, ParseIntPipe, NotFoundException, BadRequestException, InternalServerErrorException, Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { IUser } from './interfaces/user.interface';
import { AuthService } from 'src/auth/auth.service';
import { UpdateUserDto } from './DTOs/index.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as nodemailer from "nodemailer";
import { User } from './users.entity';
import { CommonService } from 'src/common/services/handleExceptions.service';
import { CreateUserDto } from './DTOs/create-user.dto';
import { Workii } from '../workiis/entities/workiis.entity';
import { PaginationDto } from 'src/common/DTOs/pagination.dto';
import { validate as IsUUID } from 'uuid';
import { FileInterceptorService } from 'src/common/services/uploadFiles.service';
import { fileNamer } from '../common/helpers/fileNamer.helper';
import { join } from 'path';
import { existsSync } from 'fs';


@Injectable()
export class UsersService {

    email: string;
    password: string;
    private readonly logger = new Logger('UsersService');

    constructor(
        private authService: AuthService,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Workii)
        private readonly workiiRepository: Repository<Workii>,
        private readonly commonServices: CommonService,
        private readonly fileInterceptorService: FileInterceptorService  
        ) {}

    async create({password, email, avatar, workiis = [], ...usersDetails}: CreateUserDto, file: Express.Multer.File) {
        
        password = this.password

        if(!file) {
            throw new BadRequestException('Make sure that the file is a image')
        }
        
        //TODO: Cambiar endpoint de las imagenes (Se deberian subir a la nube)
        avatar = join(__dirname, '../../static/avatars', file.filename);
    
        if( !existsSync(avatar) ) {
          throw new BadRequestException(`Not product found with image ${file.filename}`);
        }

        console.log(avatar);
        
        const hashedPassword = await this.authService.hashPassword(password);

        try {
            if(password && email) {
            const user = this.userRepository.create(
                {
                    id: uuidv4(),
                    password: hashedPassword,
                    email: this.email,
                    ...usersDetails,
                    workiis: workiis.map((workii: Workii) => {
                       return this.workiiRepository.create(workii)
                    }),
                    avatar,
                    timeOfCreation: new Date().getTime()
                }
            )
      
                console.log(this.authService.otpTime);
                
                await this.userRepository.save(user)
                return {...user, workiis};

        }

        throw new BadRequestException("El código OTP es erroneo o no es valido");


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

        //console.log(paginationDto);
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


    async sendOtpByEmail(email: string, password: string): Promise<void | string>  {

        this.email = email.trim().toLocaleLowerCase();       
        this.password = password;

            const otp = this.authService.createOtp();
            const config = {
            service: "gmail",
            auth: {
                user: process.env.NODEMAILER_USER,
                pass: process.env.PASS_GMAIL,
            },
            }
    
            const mailOptions = {
            from: process.env.NODEMAILER_USER,
            to: this.email,
            subject: "Contraseña para crear una cuenta en Workii",
            html: `<h1>Your one-time password is: ${otp}</h1>`,
            };
    
            const transporter = nodemailer.createTransport(config);
            await transporter.sendMail(mailOptions, (err) => {
                if(err) {
                    throw new NotFoundException("No se a podido enviar el correo, algo inesperado a pasado");
                } else {
                    console.log(`Correo electronico enviado a: ${this.email}`);
                }
            });
    }

    /* no production */
    fillUsersWithSeedData(user: IUser[]){
        //this.users = user;
    }
}
