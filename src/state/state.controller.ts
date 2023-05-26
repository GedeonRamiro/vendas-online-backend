import { Controller, Get, Param } from '@nestjs/common';
import { StateService } from './state.service';
import { StateEntity } from './entities/state.entity';

@Controller('state')
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @Get()
  async getAllStates(): Promise<StateEntity[]> {
    return await this.stateService.getAllStates();
  }

  @Get(':id')
  async getState(@Param('id') id: string): Promise<StateEntity> {
    return await this.stateService.getState(id);
  }
}
