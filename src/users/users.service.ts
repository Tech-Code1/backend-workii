import { Injectable, ParseIntPipe, NotFoundException, BadRequestException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { IUser } from './interfaces/user.interface';
import { AuthService } from 'src/auth/auth.service';
import { UpdateUserDto, UserDto } from './DTOs/index.dto';
import * as nodemailer from "nodemailer";


@Injectable()
export class UsersService {

    email: string;
    password: string;
    users: IUser[] = [];

    constructor(private authService: AuthService) {}

    async create({password, email, ...users}: UserDto) {
        
        password = this.password

        const hashedPassword = await this.authService.hashPassword(password);

            const user: IUser = {
                id: uuidv4(),
                password: hashedPassword,
                email: this.email,
                ...users
            }   

            await this.users.push(user);
            
            return user
    }


    getUserById(id: string) {
        const user = this.users.find(user => user.id);
        if(!user) throw new NotFoundException(`El usuario con el siguiente id: ${id} no se ha encontrado`);

        return user
    }


    getAll() {
        return this.users
    }


    update(id: string, updateUserDto: UpdateUserDto) {
        let userDB = this.getUserById(id);

        if (updateUserDto.id && updateUserDto.id !== id)
          throw new BadRequestException('El id ingresado no es valido');
     
        const index = this.users.findIndex((user) => user.id === id);
        userDB = {
          ...userDB,
          ...updateUserDto,
          id,
        };
        this.users[index] =userDB;
        return userDB;
    }


    delete(id: string) {
        const user = this.getUserById(id);
        this.users = this.users.filter(user => user.id !== id);
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
}
