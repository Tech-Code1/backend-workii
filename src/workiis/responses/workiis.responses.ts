import { HttpStatus } from '@nestjs/common';
import { IResponses } from '../interfaces/responses.interface';

export const applicationWorkiisBadReques: IResponses = {
  ok: false,
  statusCode: HttpStatus.BAD_REQUEST,
  message:
    'El usuario que ha creado el workii no puede aplicar a su propio workii',
};

export const applicationWorkiisBadRequesId: IResponses = {
  ok: false,
  statusCode: HttpStatus.BAD_REQUEST,
  message: 'El workii con el id solicitado no se encuentra',
};

export const applicationWorkiisBadRequesDoubleApplication: IResponses = {
  ok: false,
  statusCode: HttpStatus.BAD_REQUEST,
  message: 'El usuario no puede aplicar 2 veces al mismo workii',
};

export const applicationWorkiisInternalError: IResponses = {
  ok: false,
  statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  message: 'La petición tiene un error o no es valida',
};

export const applicationWorkiisCreate: IResponses = {
  ok: true,
  statusCode: HttpStatus.CREATED,
  message: 'El usuario ha aplicado al workii de manera correcta',
};
