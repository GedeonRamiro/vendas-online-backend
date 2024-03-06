import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, In, Repository } from 'typeorm';
import { ProductEntity } from './entities/product.entity';
import { CategoryService } from '../category/category.service';
import { CreateProductDto } from './dtos/CreateProduct.dto';
import { UpdateProductDto } from './dtos/UpdateProduct.dto';
import { CountProduct } from './dtos/CountProduct.dts';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,

    @Inject(forwardRef(() => CategoryService))
    private readonly categoryService: CategoryService,
  ) {}

  async findAllProducts(
    productsId?: string[],
    isFindRelations?: boolean,
  ): Promise<ProductEntity[]> {
    let findOptions = {};

    if (productsId && productsId.length > 0) {
      findOptions = {
        where: { id: In(productsId) },
      };
    }

    if (isFindRelations) {
      findOptions = {
        ...findOptions,
        relations: {
          category: true,
        },
      };
    }

    const products = await this.productRepository.find(findOptions);

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

  async countProducstByCategoryId(): Promise<CountProduct[]> {
    return await this.productRepository
      .createQueryBuilder('product')
      .select('product.category_id, COUNT(*) as total')
      .groupBy('product.category_id')
      .getRawMany();
  }
}
