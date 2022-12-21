import { Injectable, NotFoundException } from '@nestjs/common';
import { hash, compare } from 'bcrypt';
import { loginUserDto } from './DTOs/login.dto';

@Injectable()
export class AuthService {
    private readonly characters: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    private otp: string = ""
    otpExpirationStart: number;
    otpIsValid: boolean = false;

    constructor() {
    }

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


    validateTimePassword(otpEntry: string): boolean {

        //console.log(this.otp);

        if(otpEntry === "" || !this.otp) {
            this.otpIsValid = false;

            throw new NotFoundException("El OTP es invalido, genera otro para poder acceder");
        }
        
       if (otpEntry === this.otp ) {

        console.log("El Otp coincide");
        const secondsElapsed = (Date.now() - this.otpExpirationStart) / 1000;

        console.log(secondsElapsed);
        
        return secondsElapsed > 120
            ? this.otpIsValid = false 
            : this.otpIsValid = true

        } else {
            this.otpIsValid = false;
            throw new NotFoundException("El OTP es erroneo");
        }
    }

    async hashPassword( password: string) {
        const plainToHash = await hash(password, 10);
        return password = plainToHash
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
