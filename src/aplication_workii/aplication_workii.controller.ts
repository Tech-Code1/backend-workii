import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { PaginationDto } from 'src/common/DTOs/pagination.dto';
import { AplicationWorkiiService } from './aplication_workii.service';
import { CreateAplicationWorkiiDto } from './dto/create-aplication_workii.dto';
import { UpdateAplicationWorkiiDto } from './dto/update-aplication_workii.dto';

@Controller('aplication-workii')
export class AplicationWorkiiController {
  constructor(
    private readonly aplicationWorkiiService: AplicationWorkiiService,
  ) {}

  /* @Post()
  create(@Body() createAplicationWorkiiDto: CreateAplicationWorkiiDto) {
    return this.aplicationWorkiiService.create(createAplicationWorkiiDto);
  } */

  @Get('workii')
  findAllApplicationsWorkiiByWorkii(@Query() paginationDto: PaginationDto) {
    return this.aplicationWorkiiService.findAllApplicationsWorkiiByWorkii(
      paginationDto,
    );
  }

  @Get('user')
  findAllApplicationsWorkiiByUser(@Query() paginationDto: PaginationDto) {
    return this.aplicationWorkiiService.findAllApplicationsWorkiiByUser(
      paginationDto,
    );
  }

  @Get(':id')
  findByApplicationId(@Param('id') id: string) {
    return this.aplicationWorkiiService.findByApplicationId(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAplicationWorkiiDto: UpdateAplicationWorkiiDto,
  ) {
    return this.aplicationWorkiiService.update(id, updateAplicationWorkiiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aplicationWorkiiService.remove(id);
  }
}
