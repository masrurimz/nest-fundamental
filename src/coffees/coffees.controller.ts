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

@Controller('coffees')
export class CoffeesController {
  @Get()
  findAll(@Query() paginatedQuery) {
    const { limit, offset } = paginatedQuery;

    return `This section returns all coffes. With Limit: ${limit} and offset ${offset}`;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action return #${id} coffee`;
  }

  @Post()
  create(@Body() body) {
    return body;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body) {
    return `This action update #${id} coffee`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes #${id} coffee`;
  }
}
