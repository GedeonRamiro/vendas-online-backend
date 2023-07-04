import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ReturnProductDto } from './dtos/ReturnProduct.dto';
import { CreateProductDto } from './dtos/CreateProduct.dto';
import { ProductEntity } from './entities/product.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UpdateProductDto } from './dtos/UpdateProduct.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAllproducts(): Promise<ReturnProductDto[]> {
    return (await this.productService.findAllProducts()).map(
      (product) => new ReturnProductDto(product),
    );
  }

  @Delete('/:productId')
  async deleteProduct(
    @Param('productId') productId: string,
  ): Promise<DeleteResult> {
    return this.productService.deleteProduct(productId);
  }

  @UsePipes(ValidationPipe)
  @Put('/:productId')
  async updateProduct(
    @Param('productId') productId: string,
    @Body() updateProduct: UpdateProductDto,
  ): Promise<ProductEntity> {
    return this.productService.updateProduct(productId, updateProduct);
  }

  @UsePipes(ValidationPipe)
  @Post()
  async createProduct(
    @Body() createProduct: CreateProductDto,
  ): Promise<ProductEntity> {
    return await this.productService.createProduct(createProduct);
  }
}
