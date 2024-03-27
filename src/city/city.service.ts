import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CityEntity } from './entities/city.entity';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(CityEntity)
    private readonly CityRepository: Repository<CityEntity>,
  ) {}

  async getAllCitiesByStateId(stateId: string): Promise<CityEntity[]> {
    const cities = await this.CityRepository.find({
      where: {
        state_id: stateId,
      },
    });

    return cities;
  }

  async findCityById(id: string): Promise<CityEntity> {
    const city = await this.CityRepository.findOneBy({ id });

    if (!city) throw new NotFoundException(`Cidade com id ${id} não existe!`);

    return city;
  }

  async findCityByName(
    nameCity: string,
    nameState: string,
  ): Promise<CityEntity> {
    const city = await this.CityRepository.findOne({
      where: {
        name: nameCity,
        state: {
          uf: nameState,
        },
      },
      relations: {
        state: true,
      },
    });

    if (!city) throw new NotFoundException(`City not found.`);

    return city;
  }
}
