import { Injectable, BadRequestException, InternalServerErrorException, Logger } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IErrorsTypeORM } from 'src/shared/interfaces/errorsTypeORM.interface';


@Injectable()
export class CommonService {

    email: string;
    password: string;
    private readonly logger = new Logger('UsersService');

    constructor( ) {}


    handleExceptions(error: IErrorsTypeORM) {

    if(error.code === '23505')
        throw new BadRequestException(error.detail);
    
        this.logger.error(error)
        //console.log(error);
        throw new InternalServerErrorException('Unexpected error, check server logs')
    }
}
