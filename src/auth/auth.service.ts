import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as nodemailer from "nodemailer";
import { hash, compare } from 'bcrypt';
import { loginUserDto } from './DTOs/login.dto';
import { Router } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    private readonly characters: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    private otp: string = ""
    otpExpirationStart: number;

    constructor(private jwtService: JwtService) {}

    createOtp(): string {
        const words = ["1", "2", "3", "4"].map((word) => {
            for (let i = 0; i < 5; i++) {
              word += this.characters.charAt(Math.floor(Math.random() * this.characters.length));
            }
            return word;
          });

          this.otpExpirationStart  = Date.now();

          return this.otp = words.join("-");      
    }

    async sendOtpByEmail(email: string): Promise<void> {
        const password = this.createOtp();
        const config = {
      service: "gmail",
      auth: {
          user: process.env.NODEMAILER_USER,
          pass: process.env.PASS_GMAIL,
      },
    }
    const mailOptions = {
      from: process.env.NODEMAILER_USER,
      to: email,
      subject: "Contraseña para crear una cuenta en Workii",
      html: `<h1>Your one-time password is: ${password}</h1>`,
    };

    const transporter = nodemailer.createTransport(config);
    await transporter.sendMail(mailOptions, (err) => {
        if(err) {
            console.log('No se a podido enviar el correo, algo inesperado a pasado.');
        } else {
            console.log(`Correo electronico enviado a: ${email}`);
        }
    });
    }

    validateTimePassword(otpEntry: string): boolean {

        //console.log(this.otp);
        
       if (otpEntry === this.otp ) {
        console.log("El Otp coincide");
        const secondsElapsed = (Date.now() - this.otpExpirationStart) / 1000;

        console.log(secondsElapsed);
        
        return secondsElapsed > 120
            ? false
            : true

        } else {
            
            console.log("El Otp es erroneo");
        }

       return false
    }

    async hashPassword( password: string){
        const plainToHash = await hash(password, 10);
        password = plainToHash
    }

    async login({email, password}: loginUserDto) {
        /* const findUser = await this.userModel.findOne({email})

        if(!findUser) throw new HttpException('USER_NOT_FOUND', 404);

        const checkPassword = await compare(password, findUser.password);

        if(!checkPassword) throw new HttpException('PASSWORD_INVALID', 403);

        const payload = {id: findUser.id, nick:findUser.nick}
        const token = this.jwtService.sign(payload)
        const data = {
            user: findUser,
            token
        };

        return data */
    }
}
