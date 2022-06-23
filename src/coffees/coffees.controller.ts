import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly conffeeService: CoffeesService) {}

  @Get()
  findAll(@Query() paginationQuery) {
    const { limit, offset } = paginationQuery;

    return this.conffeeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.conffeeService.findOne(id);
  }

  @Post()
  create(@Body() body) {
    return this.conffeeService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body) {
    return this.conffeeService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.conffeeService.remove(id);
  }
}
