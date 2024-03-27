import { Controller, Get, Param } from '@nestjs/common';
import { CorreiosService } from './correios.service';
import { ReturnCepExternal } from './dtos/ReturnCepExternal.dto';
import { ReturnCepDTO } from './dtos/ReturnCep.dto';

@Controller('correios')
export class CorreiosController {
  constructor(private readonly correiosService: CorreiosService) {}

  @Get('/:cep')
  async findAddressByCep(@Param('cep') cep: string): Promise<ReturnCepDTO> {
    return this.correiosService.findAddressByCep(cep);
  }
}
