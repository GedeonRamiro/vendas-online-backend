import { Test, TestingModule } from '@nestjs/testing';
import { CartService } from '../cart.service';
import { Repository } from 'typeorm';
import { CartEntity } from '../entities/cart.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CartProductService } from '../../cart-product/cart-product.service';
import { cartMock } from '../__mocks__/cart.mock';
import { returnDeleteMock } from '../../product/__mocks__/returnDeleteProeduct.mock';

describe('CartService', () => {
  let service: CartService;
  let cartRepository: Repository<CartEntity>;
  let cartProductService: CartProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartService,
        {
          provide: getRepositoryToken(CartEntity),
          useValue: {
            save: jest.fn().mockResolvedValue(cartMock),
            findOne: jest.fn().mockResolvedValue(cartMock),
          },
        },

        {
          provide: CartProductService,
          useValue: {
            insertProductInCart: jest.fn().mockResolvedValue(undefined),
            updateProductInCart: jest.fn().mockRejectedValue(returnDeleteMock),
            deleteProductCart: jest.fn().mockRejectedValue(undefined),
          },
        },
      ],
    }).compile();

    service = module.get<CartService>(CartService);
    cartRepository = module.get<Repository<CartEntity>>(
      getRepositoryToken(CartEntity),
    );
    cartProductService = module.get<CartProductService>(CartProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(cartRepository).toBeDefined();
    expect(cartProductService).toBeDefined();
  });

  it('should return delete result if delete cart', () => {
    const spy = jest.spyOn(cartRepository, 'save');

    expect(service).toBeDefined();
    expect(cartRepository).toBeDefined();
    expect(cartProductService).toBeDefined();
  });
});
