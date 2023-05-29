import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CityEntity } from './entities/city.entity';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(CityEntity)
    private readonly CityRepositorY: Repository<CityEntity>,
  ) {}

  async getAllCitiesByStateId(stateId: string): Promise<CityEntity[]> {
    const cities = await this.CityRepositorY.find({
      where: {
        state_id: stateId,
      },
    });

    return cities;
  }

  async findCityById(id: string): Promise<CityEntity> {
    const city = await this.CityRepositorY.findOneBy({ id });

    if (!city) throw new NotFoundException(`Cidade com id ${id} não existe!`);

    return city;
  }
}
