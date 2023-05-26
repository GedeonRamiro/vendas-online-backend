import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StateEntity } from './entities/state.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StateService {
  constructor(
    @InjectRepository(StateEntity)
    private readonly StateRepository: Repository<StateEntity>,
  ) {}

  async getAllStates(): Promise<StateEntity[]> {
    return await this.StateRepository.find();
  }

  async getState(id: string): Promise<StateEntity> {
    const resultGetStateById = await this.StateRepository.findOneBy({ id });
    return resultGetStateById;
  }
}
