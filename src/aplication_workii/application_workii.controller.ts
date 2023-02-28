import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { PaginationDto } from 'src/common/DTOs/pagination.dto';
import { ApplicationWorkiiService } from './application_workii.service';
import { UpdateApplicationWorkiiDto } from './dto/update-application_workii.dto';

@Controller('aplication-workii')
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

  @Get('user')
  findAllApplicationsWorkiiByUser(@Query() paginationDto: PaginationDto) {
    return this.applicationWorkiiService.findAllApplicationsWorkiiByUser(
      paginationDto,
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
