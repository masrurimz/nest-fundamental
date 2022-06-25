import { IsString } from 'class-validator';

export class CreateCoffeeDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly description: string;

  @IsString()
  readonly brand: string;

  @IsString({ each: true })
  readonly flavors: string[];
}
