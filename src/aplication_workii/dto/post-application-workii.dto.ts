import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class PostApplicationDto {
	@ApiProperty({
		description: 'Id del workii',
		uniqueItems: true,
		required: true,
		nullable: false
	})
	@IsString()
	@IsUUID()
	workii: string;

	@ApiProperty({
		description: 'Id del usuario',
		uniqueItems: true,
		required: true,
		nullable: false
	})
	@IsString()
	@IsString()
	user: string;
}
