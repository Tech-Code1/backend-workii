import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationDto {
	@ApiProperty({
		default: 10,
		description: 'Limite de resultados por cáda pagina'
	})
	@IsOptional()
	@IsPositive()
	@Type(() => Number)
	limit?: number;

	@ApiProperty({
		default: 0,
		description: 'Número del limite de datos por cada pagina'
	})
	@IsOptional()
	@Min(0)
	@Type(() => Number)
	offset?: number;
}
