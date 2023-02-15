import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  Req,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { hashSync } from 'bcrypt';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from 'src/auth/DTOs/login-user.dto';
import { User } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import * as nodemailer from 'nodemailer';
import { IJwtPaypload } from './interfaces/jwt-payload.interface';
import { BadRequestException, HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
  private readonly characters: string =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  private otp = '';
  email: string;
  password: string;
  otpExpirationStart: number;
  otpIsValid = false;
  otpTime: number;
  otpMatch = false;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  createOtp(): string {
    const words = ['1', '2', '3', '4'].map((word) => {
      for (let i = 0; i < 5; i++) {
        word += this.characters.charAt(
          Math.floor(Math.random() * this.characters.length),
        );
      }
      return word;
    });

    this.otpExpirationStart = Date.now();
    this.otpIsValid = true;

    return (this.otp = words.join('-'));
  }

  validateTimePassword(otpEntry: string, res: Response) {
    //console.log(this.otp);

    if (otpEntry === '' || !this.otp) {
      this.otpMatch = false;
      this.otpIsValid = false;

      throw new NotFoundException(
        'El OTP es invalido, genera otro para poder acceder',
      );
    }

    if (otpEntry === this.otp) {
      this.otpMatch = true;
      this.otpIsValid = true;
      res.json({ ok: true });
      console.log('El Otp coincide');

      const secondsElapsed = Math.floor(
        (Date.now() - this.otpExpirationStart) / 1000,
      );

      this.otpTime = secondsElapsed;

      console.log(this.otpTime);

      const interval = setInterval(() => {
        this.otpTime += 1;
        console.log(this.otpTime);
        if (this.otpTime > 120 || this.otpIsValid) {
          clearInterval(interval);
        }
      }, 1000);
    } else {
      res.json({ ok: false });
      throw new NotFoundException('El OTP es erroneo');
    }
  }

  async hashPassword(password: string) {
    const plainToHash = hashSync(password, 10);
    return (password = plainToHash);
  }

  async login({ email, password }: LoginUserDto): Promise<any> {
    this.email = email!.trim().toLocaleLowerCase();
    this.password = password!;

    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .select(['user.email', 'user.password', 'user.id'])
      .getOne();

    if (!user) {
      //const hashedPassword = await this.hashPassword(password);
      await this.sendOtpEmail(this.email);
      console.log('El OTP se le ha enviado');
      return { ok: false, email, password };
    }

    if (!bcrypt.compareSync(this.password, user!.password)) {
      throw new HttpException(
        {
          ok: false,
          message: 'Las credenciales no son validas',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return {
      ok: true,
      ...user,
      token: this.getJwtToken({ id: user.id }),
    };
  }

  async sendOtpEmail(email: string): Promise<void> {
    const otp = this.createOtp();
    const config = {
      service: 'gmail',
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.PASS_GMAIL,
      },
    };

    const mailOptions = {
      from: process.env.NODEMAILER_USER,
      to: email,
      subject: 'Contraseña para crear una cuenta en Workii',
      html: `<h1>Your one-time password is: ${otp}</h1>`,
    };

    const transporter = nodemailer.createTransport(config);
    await transporter.sendMail(mailOptions, (err) => {
      if (err) {
        throw new NotFoundException(
          'No se a podido enviar el correo, algo inesperado a pasado',
        );
      } else {
        console.log(`Correo electronico enviado a: ${this.email}`);
      }
    });
  }

  async checkAuthStatus(user: User) {
    return {
      ...user,
      token: this.getJwtToken({ id: user.id }),
    };
  }

  getJwtToken(payload: IJwtPaypload): string {
    const token = this.jwtService.sign(payload);

    return token;
  }

  revalidateToken({ id }: Request, res: Response) {
    const token = this.getJwtToken({ id });

    return res.json({
      ok: true,
      id,
      token,
    });
  }
}
