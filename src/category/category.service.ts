import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { CategoryEntity } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto } from './dtos/CreateCategory.dto';
import { ProductService } from '../product/product.service';
import { CountProduct } from '../product/dtos/CountProduct.dts';
import { ReturnCategoryDto } from './dtos/ReturnCategory.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
    private readonly productService: ProductService,
  ) {}

  findAmountCategoryInProducts(
    category: CategoryEntity,
    countList: CountProduct[],
  ): number {
    const count = countList.find(
      (itemCount) => itemCount.category_id === category.id,
    );

    if (count) {
      return count.total;
    }

    return 0;
  }

  async findAllCategories(): Promise<ReturnCategoryDto[]> {
    const categories = await this.categoryRepository.find();

    const count = await this.productService.countProducstByCategoryId();

    if (!categories || categories.length === 0) {
      throw new NotFoundException('Categories empty');
    }

    return categories.map(
      (category) =>
        new ReturnCategoryDto(
          category,
          this.findAmountCategoryInProducts(category, count),
        ),
    );
  }

  async findCategoryByName(name: string): Promise<CategoryEntity> {
    const categoty = await this.categoryRepository.findOne({
      where: { name },
    });

    if (!categoty) {
      throw new NotFoundException(`Category name ${name} not found`);
    }

    return categoty;
  }

  async findCategoryById(id: string): Promise<CategoryEntity> {
    const categoty = await this.categoryRepository.findOne({
      where: { id },
    });

    if (!categoty) {
      throw new NotFoundException(`Category id: ${id} not found`);
    }

    return categoty;
  }

  async createCategory(
    createCategory: CreateCategoryDto,
  ): Promise<CategoryEntity> {
    const category = await this.findCategoryByName(createCategory.name).catch(
      () => undefined,
    );

    if (category) {
      throw new BadRequestException(
        `Category name ${createCategory.name} exist`,
      );
    }

    return this.categoryRepository.save(createCategory);
  }
}
