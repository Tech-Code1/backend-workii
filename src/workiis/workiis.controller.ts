import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ParseUUIDPipe } from '@nestjs/common/pipes';
import { CreateWikiiDto } from './dto/create-workiis.dto';
import { UpdateWikiiDto } from './dto/update-workiis.dto';
import { WorkiisService } from './workiis.service';

@Controller('wikiis')
export class WorkiisController {
  constructor(private readonly workiisService: WorkiisService) {}

  @Post()
  create(@Body() createWikiiDto: CreateWikiiDto) {
    return this.workiisService.create(createWikiiDto);
  }

  @Get()
  findAll() {
    return this.workiisService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.workiisService.findOne(id);
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
