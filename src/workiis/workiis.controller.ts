import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ParseUUIDPipe } from '@nestjs/common/pipes';
import { CreateWikiiDto } from './dto/create-workiis.dto';
import { UpdateWikiiDto } from './dto/update-workiis.dto';
import { WorkiisService } from './workiis.service';
import { PaginationDto } from '../common/DTOs/pagination.dto';

@Controller('workiis')
export class WorkiisController {
  constructor(private readonly workiisService: WorkiisService) {}

  @Post()
  create(@Body() createWikiiDto: CreateWikiiDto) {
    return this.workiisService.create(createWikiiDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    //console.log(paginationDto);
    return this.workiisService.findAll(paginationDto);
  }

  @Get(':code')
  findOne(@Param('code') code: string) {
    return this.workiisService.findOne(code);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateWikiiDto: UpdateWikiiDto) {
    return this.workiisService.update(id, updateWikiiDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.workiisService.remove( id );
  }
}
