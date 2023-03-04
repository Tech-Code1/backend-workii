import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
  Res,
} from '@nestjs/common';
import { PaginationDto } from 'src/common/DTOs/pagination.dto';
import { ApplicationWorkiiService } from './application_workii.service';
import { UpdateApplicationWorkiiDto } from './dto/update-application_workii.dto';
import { Response } from 'express';

@Controller('applications')
export class ApplicationWorkiiController {
  constructor(
    private readonly applicationWorkiiService: ApplicationWorkiiService,
  ) {}

  /* @Post()
  create(@Body() createAplicationWorkiiDto: CreateAplicationWorkiiDto) {
    return this.aplicationWorkiiService.create(createAplicationWorkiiDto);
  } */

  @Get('workii')
  findAllApplicationsWorkiiByWorkii(@Query() paginationDto: PaginationDto) {
    return this.applicationWorkiiService.findAllApplicationsWorkiiByWorkii(
      paginationDto,
    );
  }

  @Get('user/:id')
  async findAllApplicationsWorkiiByUser(@Param('id') id: string) {
    return await this.applicationWorkiiService.findAllApplicationsWorkiiByUser(
      id,
    );
  }

  @Get(':id')
  findByApplicationId(@Param('id') id: string) {
    return this.applicationWorkiiService.findByApplicationId(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAplicationWorkiiDto: UpdateApplicationWorkiiDto,
  ) {
    return this.applicationWorkiiService.update(id, updateAplicationWorkiiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.applicationWorkiiService.remove(id);
  }
}