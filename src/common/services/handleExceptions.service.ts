import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { IErrorsTypeORM } from 'src/shared/interfaces/errorsTypeORM.interface';

@Injectable()
export class CommonService {
  email: string;
  password: string;
  private readonly logger = new Logger('UsersService');

  constructor() {}

  handleExceptions(error: IErrorsTypeORM) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);
    //console.log(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
