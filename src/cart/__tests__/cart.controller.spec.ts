import { Test, TestingModule } from '@nestjs/testing';
import { CartController } from '../cart.controller';
import { CartService } from '../cart.service';
import { cartMock } from '../__mocks__/cart.mock';
import { insertCartMock } from '../__mocks__/insert.mock';
import { userEntityMock } from '../../user/__mocks__/user.mock';
import { returnDeleteMock } from '../../__mocks__/returnDelete.mock';
import { productMock } from '../../product/__mocks__/product.mock';
import { updateCartMock } from '../__mocks__/update-cart.mock ';

describe('CartController', () => {
  let controller: CartController;
  let cartService: CartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CartService,
          useValue: {
            insertProductInCart: jest.fn().mockResolvedValue(cartMock),
            findCartByUserId: jest.fn().mockResolvedValue(cartMock),
            deleteProductCart: jest.fn().mockResolvedValue(returnDeleteMock),
            updateProductInCart: jest.fn().mockResolvedValue(cartMock),
          },
        },
      ],

      controllers: [CartController],
    }).compile();

    controller = module.get<CartController>(CartController);
    cartService = module.get<CartService>(CartService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(cartService).toBeDefined();
  });

  it('should cart Entity in insertProductInCart', async () => {
    const cart = await controller.createCart(
      insertCartMock,
      userEntityMock.id as string,
    );

    expect(cart).toEqual({
      id: cartMock.id,
    });
  });

  it('should cart Entity in insertProductInCart', async () => {
    const cart = await controller.findCartByUserId(userEntityMock.id);

    expect(cart).toEqual({
      id: cartMock.id,
    });
  });

  it('should return DeleteResult in clearCart', async () => {
    const cart = await controller.deleteProductCart(
      productMock.id as string,
      userEntityMock.id as string,
    );

    expect(cart).toEqual(returnDeleteMock);
  });

  it('should cart Entity in updateProductInCart', async () => {
    const cart = await controller.updateCart(updateCartMock, userEntityMock.id);

    expect(cart).toEqual({
      id: cartMock.id,
    });
  });
});
