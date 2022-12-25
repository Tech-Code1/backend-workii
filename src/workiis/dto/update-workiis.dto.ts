import { PartialType } from '@nestjs/swagger';
import { CreateWorkiiDto } from './create-workiis.dto';

export class UpdateWikiiDto extends PartialType(CreateWorkiiDto) {

}
