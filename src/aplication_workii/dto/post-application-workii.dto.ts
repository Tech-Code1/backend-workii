import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';
import { Workii } from 'src/workiis/entities/workiis.entity';
import { CreateApplicationWorkiiDto } from './create-application_workii.dto';
import { User } from '../../users/users.entity';

export class PostApplicationDto {
  @ApiProperty({
    description: 'Id del workii',
    uniqueItems: true,
    required: true,
    nullable: false,
  })
  @IsString()
  @IsUUID()
  workii: string;

  @ApiProperty({
    description: 'Id del usuario',
    uniqueItems: true,
    required: true,
    nullable: false,
  })
  @IsString()
  @IsString()
  user: string;
}
