import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeRepository: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,
  ) {}

  findAll() {
    return this.coffeRepository.find({
      relations: {
        flavors: true,
      },
    });
  }

  async findOne(id: string) {
    const coffee = await this.coffeRepository.findOne({
      where: {
        id: +id,
      },
      relations: {
        flavors: true,
      },
    });
    if (!coffee) {
      throw new NotFoundException(`Coffe #${id} not found`);
    }

    return coffee;
  }

  async create(createCoffeDto: CreateCoffeeDto) {
    const flavors = await Promise.all(
      createCoffeDto.flavors.map((name) => this.preloadFlavorByName(name)),
    );

    const coffee = this.coffeRepository.create({
      ...createCoffeDto,
      flavors,
    });
    return this.coffeRepository.save(coffee);
  }

  async update(id: string, updateCoffeDto: UpdateCoffeeDto) {
    const flavors =
      updateCoffeDto.flavors &&
      (await Promise.all(
        updateCoffeDto.flavors.map((name) => this.preloadFlavorByName(name)),
      ));

    const coffee = await this.coffeRepository.preload({
      id: +id,
      ...updateCoffeDto,
      flavors,
    });
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return this.coffeRepository.save(coffee);
  }

  async remove(id: string) {
    const coffee = await this.findOne(id);

    return this.coffeRepository.remove(coffee);
  }

  private async preloadFlavorByName(name: string): Promise<Flavor> {
    const existingFlavor = await this.flavorRepository.findOne({
      where: {
        name,
      },
    });
    if (existingFlavor) {
      return existingFlavor;
    }
    return this.flavorRepository.create({
      name,
    });
  }
}
