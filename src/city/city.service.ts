import { Injectable } from '@nestjs/common';
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
}
