import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressEntity } from './entities/address.entity';
import { CityModule } from 'src/city/city.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([AddressEntity]), CityModule, UserModule],
  providers: [AddressService],
  controllers: [AddressController],
})
export class AddressModule {}
