import { PartialType } from '@nestjs/mapped-types';
import { CreateCoffeeDto } from './create-coffe.dto';

export class UpdateCoffeDto extends PartialType(CreateCoffeeDto) {}
