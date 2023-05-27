import { PartialType } from '@nestjs/swagger';
import { CreateApplicationWorkiiDto } from './create-application_workii.dto';

export class UpdateApplicationWorkiiDto extends PartialType(CreateApplicationWorkiiDto) {}
