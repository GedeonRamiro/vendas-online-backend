import { ReturnCityDto } from '../../city/dtos/ReturnCity.dto';
import { AddressEntity } from '../entities/address.entity';

export class ReturnAddressDto {
  complement: string;
  cep: string;
  numberAddress: number;
  city: ReturnCityDto;

  constructor(address: AddressEntity) {
    this.complement = address.complement;
    this.cep = address.cep;
    this.numberAddress = address.numberAddress;
    this.city = address.city ? new ReturnCityDto(address.city) : undefined;
  }
}
