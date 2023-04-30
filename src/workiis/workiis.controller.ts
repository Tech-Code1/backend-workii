import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Res,
} from '@nestjs/common';
import { ParseUUIDPipe, ValidationPipe } from '@nestjs/common/pipes';
import { CreateWorkiiDto } from './dto/create-workiis.dto';
import { UpdateWikiiDto } from './dto/update-workiis.dto';
import { WorkiisService } from './workiis.service';
import { PaginationDto } from '../common/DTOs/pagination.dto';
import { Auth } from 'src/auth/decorators/index.decorator';
import { EValidRoles } from 'src/auth/interfaces/valid-roles.interface';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Workii } from './entities/workiis.entity';
import { CreateApplicationWorkiiDto } from 'src/aplication_workii/dto/create-application_workii.dto';
import { Response } from 'express';
import { PostApplicationDto } from 'src/aplication_workii/dto/post-application-workii.dto';

@Controller('workiis')
@ApiTags('workiis')
@Auth(EValidRoles.user)
export class WorkiisController {
  constructor(private readonly workiisService: WorkiisService) { }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Workii was created successfully',
    type: Workii,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbiden. Token related' })
  create(@Body() createWikiiDto: CreateWorkiiDto) {
    return this.workiisService.create(createWikiiDto);
  }

  @Post('application')
  @ApiResponse({
    status: 201,
    description: 'Se ha aplicado al workii correctamente',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbiden. Token related' })
  async applicationWorkii(
    @Res() res: Response,
    @Body() { workii, user }: PostApplicationDto,
    @Body() createApplicationWorkiiDto: CreateApplicationWorkiiDto,
  ) {
    return await this.workiisService.applicationWorkii(
      workii,
      user,
      res,
      createApplicationWorkiiDto,
    );
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.workiisService.findAll(paginationDto);
  }

  @Get('search')
  async searchWorkiis(
    @Query('searchTerm') searchTerm: string,
    @Query('limit') limit: number,
    @Query('offset') offset: number,
  ): Promise<Workii[]> {
    return this.workiisService.searchWorkiis(searchTerm, limit, offset);
  }

  @Get(':code')
  findOne(@Param('code') code: string) {
    return this.workiisService.findOne(code);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateWikiiDto: UpdateWikiiDto,
  ) {
    return this.workiisService.update(id, updateWikiiDto);
  }

  @Delete('apply/:id')
  removeApplication(
    @Param('id', ParseUUIDPipe) id: string,
    @Res() response: Response,
    @Body('workii', ParseUUIDPipe) workii: string,
  ) {
    return this.workiisService.removeApplication(id, workii, response);
  }

  @Delete(':id')
  async deleteWorkii(
    @Param('id', ParseUUIDPipe) id: string,
    @Res() response: Response,
  ) {
    return await this.workiisService.deleteWorkii(id, response);
  }
}
