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
import { Public } from 'src/common/decorators/public.decorator';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly conffeeService: CoffeesService) {}

  @Public()
  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.conffeeService.findAll(paginationQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.conffeeService.findOne(id);
  }

  @Post()
  create(@Body() createCoffeDto: CreateCoffeeDto) {
    return this.conffeeService.create(createCoffeDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoffeDto: UpdateCoffeeDto) {
    return this.conffeeService.update(id, updateCoffeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.conffeeService.remove(id);
  }
}
