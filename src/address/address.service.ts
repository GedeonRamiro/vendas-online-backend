import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressEntity } from './entities/address.entity';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './dtos/CreateAddress.dto';
import { CityService } from '../city/city.service';
import { UserService } from '../user/user.service';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressEntity>,
    private readonly cityService: CityService,
    private readonly userService: UserService,
  ) {}

  async createAddress(
    createAddressDto: CreateAddressDto,
    userId: string,
  ): Promise<AddressEntity> {
    await this.userService.findUserById(userId);
    await this.cityService.findCityById(createAddressDto.cityId);

    return await this.addressRepository.save({
      ...createAddressDto,
      userId,
    });
  }

  async findAddressByUserId(userId: string): Promise<AddressEntity[]> {
    const address = await this.addressRepository.find({
      where: {
        userId,
      },
      relations: {
        city: {
          state: true,
        },
      },
    });

    if (!address) {
      throw new NotFoundException(
        `Endereço com usuário id ${userId} não existe!`,
      );
    }

    return address;
  }

  async findAddressById(id: string): Promise<AddressEntity> {
    const address = await this.addressRepository.findOneBy({ id });
    if (!address)
      throw new NotFoundException(`Endereço com id ${id} não existe!`);
    return address;
  }
}
