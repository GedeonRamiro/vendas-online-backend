import { Module } from '@nestjs/common';
import { CartProductService } from './cart-product.service';
import { CartProductController } from './cart-product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartProductEntity } from './entities/cart-product.entity';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [TypeOrmModule.forFeature([CartProductEntity]), ProductModule],
  providers: [CartProductService],
  controllers: [CartProductController],
  exports: [CartProductService],
})
export class CartProductModule {}
