import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ProductEntity } from './entities/product.entity';
import { CategoryService } from '../category/category.service';
import { CreateProductDto } from './dtos/CreateProduct.dto';
import { UpdateProductDto } from './dtos/UpdateProduct.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    private readonly categoryService: CategoryService,
  ) {}

  async findAllProducts(): Promise<ProductEntity[]> {
    const products = await this.productRepository.find({
      relations: { category: true },
    });

    if (!products || products.length === 0) {
      throw new NotFoundException('Products empty');
    }

    return products;
  }

  async findProductById(productId: string): Promise<ProductEntity> {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException(`Product id: ${productId} not found`);
    }

    return product;
  }

  async createProduct(createProduct: CreateProductDto): Promise<ProductEntity> {
    await this.categoryService.findCategoryById(createProduct.categoryId);

    return await this.productRepository.save(createProduct);
  }

  async updateProduct(
    productId: string,
    updateProduct: UpdateProductDto,
  ): Promise<ProductEntity> {
    const product = await this.findProductById(productId);
    await this.categoryService.findCategoryById(updateProduct.categoryId);

    await this.productRepository.update(productId, updateProduct);
    return product;
  }

  async deleteProduct(productId: string): Promise<DeleteResult> {
    await this.findProductById(productId);

    return this.productRepository.delete({ id: productId });
  }
}
