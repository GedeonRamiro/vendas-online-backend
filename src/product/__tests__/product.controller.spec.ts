import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from '../product.controller';
import { ProductService } from '../product.service';
import { productMock } from '../__mocks__/product.mock';
import { createProductMock } from '../__mocks__/createProduct.mock';
import { returnDeleteMock } from '../../__mocks__/returnDelete.mock';
import { updateProductMock } from '../__mocks__/updateProduct.mock';

describe('ProductController', () => {
  let controller: ProductController;
  let productService: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ProductService,
          useValue: {
            findAllProducts: jest.fn().mockResolvedValue([productMock]),
            createProduct: jest.fn().mockResolvedValue(productMock),
            deleteProduct: jest.fn().mockResolvedValue(returnDeleteMock),
            updateProduct: jest.fn().mockResolvedValue(productMock),
          },
        },
      ],

      controllers: [ProductController],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    productService = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(productService).toBeDefined();
  });

  it('should return productEntity in createProduct', async () => {
    const product = await controller.findAllproducts();

    expect(product).toEqual([
      {
        id: productMock.id,
        name: productMock.name,
        price: productMock.price,
        image: productMock.image,
      },
    ]);
  });

  it('should return productEntity in createProduct', async () => {
    const product = await controller.createProduct(createProductMock);

    expect(product).toEqual(productMock);
  });

  it('should return returnDelete in deleteProduct', async () => {
    const product = await controller.deleteProduct(productMock.id);

    expect(product).toEqual(returnDeleteMock);
  });

  it('should return ProductEntity in updateProduct', async () => {
    const product = await controller.updateProduct(
      productMock.id,
      updateProductMock,
    );

    expect(product).toEqual(productMock);
  });
});
