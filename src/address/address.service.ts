import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressEntity } from './entities/address.entity';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './dtos/createAddress.dto';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly AddressRepository: Repository<AddressEntity>,
  ) {}

  async createAddress(
    createAddressDto: CreateAddressDto,
    userId: string,
  ): Promise<AddressEntity> {
    return this.AddressRepository.save({
      ...createAddressDto,
      userId,
    });
  }
}
