import {
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { User } from 'src/users/users.entity';
import { Repository } from 'typeorm/repository/Repository';
import { IJwtPaypload } from '../interfaces/jwt-payload.interface';
import { Id } from '../decorators/get-id.decorator';
import { config } from '../config/auth.config';

declare module 'express-serve-static-core' {
  interface Request {
    id: string;
  }
}

@Injectable()
export class ValidateJwt implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.header('authorization');
    const { TokenExpiredError } = jwt;

    if (!token) {
      throw new HttpException(
        {
          ok: false,
          message: 'El token no se encuentra',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const { id } = jwt.verify(token, config.secret!) as IJwtPaypload;
      req.id = id;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new HttpException(
          {
            ok: false,
            message: 'Unauthorized! Access Token was expired!',
          },
          HttpStatus.UNAUTHORIZED,
        );
      } else {
        throw new HttpException(
          {
            ok: false,
            message: 'Token no valido',
          },
          HttpStatus.UNAUTHORIZED,
        );
      }
    }
    //TODO: OK
    next();
  }
}
