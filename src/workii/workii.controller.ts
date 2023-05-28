import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Res } from '@nestjs/common';
import { ParseUUIDPipe } from '@nestjs/common/pipes';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CreateApplicationWorkiiDto } from 'src/aplication_workii/dto/create-application_workii.dto';
import { PostApplicationDto } from 'src/aplication_workii/dto/post-application-workii.dto';
import { Auth } from 'src/auth/decorators/index.decorator';
import { EValidRoles } from 'src/auth/interfaces/valid-roles.interface';
import { PaginationDto } from '../common/DTOs/pagination.dto';
import { CreateWorkiiDto } from './dto/create-workii.dto';
import { UpdateWikiiDto } from './dto/update-workii.dto';
import { Workii } from './entities/workii.entity';
import { WorkiisService } from './workii.service';

@Controller('workiis')
@ApiTags('workiis')
@Auth(EValidRoles.user)
export class WorkiisController {
	constructor(private readonly workiisService: WorkiisService) {}

	@Post()
	@ApiResponse({
		status: 201,
		description: 'Workii was created successfully',
		type: Workii
	})
	@ApiResponse({ status: 400, description: 'Bad request' })
	@ApiResponse({ status: 403, description: 'Forbiden. Token related' })
	create(@Body() createWikiiDto: CreateWorkiiDto) {
		return this.workiisService.create(createWikiiDto);
	}

	@Post('application')
	@ApiResponse({
		status: 201,
		description: 'Se ha aplicado al workii correctamente'
	})
	@ApiResponse({ status: 400, description: 'Bad request' })
	@ApiResponse({ status: 403, description: 'Forbiden. Token related' })
	async applicationWorkii(
		@Res() res: Response,
		@Body() { workii, user }: PostApplicationDto,
		@Body() createApplicationWorkiiDto: CreateApplicationWorkiiDto
	) {
		return await this.workiisService.applicationWorkii(workii, user, res, createApplicationWorkiiDto);
	}

	@Get()
	async findAll(@Query() paginationDto: PaginationDto) {
		return await this.workiisService.findAll(paginationDto);
	}

	@Get('search')
	async searchWorkiis(
		@Query('searchTerm') searchTerm: string,
		@Query('limit') limit: number,
		@Query('offset') offset: number
	): Promise<{ workiis: Workii[]; totalSearchResults: number }> {
		return this.workiisService.searchWorkiis(searchTerm, limit, offset);
	}

	@Get(':code')
	findOne(@Param('code') code: string) {
		return this.workiisService.findOne(code);
	}

	@Patch(':id')
	update(@Param('id', ParseUUIDPipe) id: string, @Body() updateWikiiDto: UpdateWikiiDto) {
		return this.workiisService.update(id, updateWikiiDto);
	}

	@Delete('apply/:id')
	removeApplication(
		@Param('id', ParseUUIDPipe) id: string,
		@Res() response: Response,
		@Body('workii', ParseUUIDPipe) workii: string
	) {
		return this.workiisService.removeApplication(id, workii, response);
	}

	@Delete(':id')
	async deleteWorkii(@Param('id', ParseUUIDPipe) id: string, @Res() response: Response) {
		return await this.workiisService.deleteWorkii(id, response);
	}
}
