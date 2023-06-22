import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dtos/CreateAddress.dto';
import { AddressEntity } from './entities/address.entity';
import { UserId } from '../decorator/user-id.decorator';
import { ReturnAddressDto } from './dtos/ReturnAddress.dto';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createAddress(
    @Body() createAddress: CreateAddressDto,
    @UserId('userId') userId: string,
  ): Promise<AddressEntity> {
    return await this.addressService.createAddress(createAddress, userId);
  }

  @Get()
  async findAddressByUserId(
    @UserId('userId') userId: string,
  ): Promise<ReturnAddressDto[]> {
    const address = (await this.addressService.findAddressByUserId(userId)).map(
      (addressEntity) => new ReturnAddressDto(addressEntity),
    );

    return address;
  }
}
