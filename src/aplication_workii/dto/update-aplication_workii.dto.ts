import { PartialType } from '@nestjs/swagger';
import { CreateAplicationWorkiiDto } from './create-aplication_workii.dto';

export class UpdateAplicationWorkiiDto extends PartialType(
  CreateAplicationWorkiiDto,
) {}
