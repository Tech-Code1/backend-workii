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
import { ParseUUIDPipe } from '@nestjs/common/pipes';
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
import { ValidationPipe } from '@nestjs/common';
import { User } from 'src/users/users.entity';

@Controller('workiis')
@ApiTags('workiis')
@Auth(EValidRoles.user)
export class WorkiisController {
  constructor(private readonly workiisService: WorkiisService) {}

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

  @Post('applications')
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

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.workiisService.remove(id);
  }
}
