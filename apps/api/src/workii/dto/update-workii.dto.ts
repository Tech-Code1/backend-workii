import { PartialType } from '@nestjs/swagger';
import { CreateWorkiiDto } from './create-workii.dto';

export class UpdateWikiiDto extends PartialType(CreateWorkiiDto) {}
