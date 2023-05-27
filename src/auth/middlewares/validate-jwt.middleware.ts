/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/naming-convention */
import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { config } from '../config/auth.config';
import { IJwtPaypload } from '../interfaces/jwt-payload.interface';

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
					message: 'El token no se encuentra'
				},
				HttpStatus.BAD_REQUEST
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
						message: 'Unauthorized! Access Token was expired!'
					},
					HttpStatus.UNAUTHORIZED
				);
			} else {
				throw new HttpException(
					{
						ok: false,
						message: 'Token no valido'
					},
					HttpStatus.UNAUTHORIZED
				);
			}
		}
		//TODO: OK
		next();
	}
}
