import { Injectable } from '@nestjs/common';
import { Coffe } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  private coffees: Coffe[] = [
    {
      id: 1,
      name: 'Gayo Aceh',
      brand: 'Nusa Coffe',
      flavors: ['Marie Regal', 'Rum'],
    },
  ];

  findAll() {
    return this.coffees;
  }

  findOne(id: string) {
    return this.coffees.find((item) => item.id === +id);
  }

  create(createCoffeDto: any) {
    this.coffees.push(createCoffeDto);
  }

  update(id: string, updateCoffeDto: any) {
    const existingCoffee = this.findOne(id);
    if (existingCoffee) {
      // Update the existing entity
    }
  }

  remove(id: string) {
    const coffeIndex = this.coffees.findIndex((item) => item.id === +id);
    if (coffeIndex > 0) {
      this.coffees.splice(coffeIndex, 1);
    }
  }
}
