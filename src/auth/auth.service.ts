import { Injectable } from '@nestjs/common';
import * as nodemailer from "nodemailer";
import { interval, map, Observable, timer } from 'rxjs';

@Injectable()
export class AuthService {
    private readonly characters: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    private otp: string = ""
    otpExpirationStart: number;


    createPassword(): string {
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
        const password = this.createPassword();
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
        
        return secondsElapsed > 30
            ? false
            : true

        } else {
            
            console.log("El Otp es erroneo");
        }

       return false
    }
}
