import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartEntity } from './entities/cart.entity';
import { DeleteResult, Repository } from 'typeorm';
import { InsertCartDTO } from './dtos/InsertCart.dto';
import { ProductService } from 'src/product/product.service';
import { CartProductService } from 'src/cart-product/cart-product.service';
import { UpdateCartDTO } from './dtos/UpdateCart.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,
    private readonly cartProductService: CartProductService,
  ) {}

  async findCartByUserId(
    userId: string,
    isRelations?: boolean,
  ): Promise<CartEntity> {
    const relations = isRelations
      ? {
          cartProduct: {
            product: true,
          },
        }
      : undefined;

    const cart = await this.cartRepository.findOne({
      where: { userId, active: true },
      relations,
    });

    if (!cart) {
      throw new NotFoundException('Cart active not found');
    }

    return cart;
  }

  async createCart(userId: string): Promise<CartEntity> {
    return await this.cartRepository.save({
      active: true,
      userId,
    });
  }

  async insertProductInCart(
    insertCartDto: InsertCartDTO,
    userId: string,
  ): Promise<CartEntity> {
    const cart = await this.findCartByUserId(userId).catch(async () => {
      return this.createCart(userId);
    });

    await this.cartProductService.insertProductInCart(insertCartDto, cart);

    return this.findCartByUserId(userId, true);
  }

  async updateProductInCart(
    updateCartDto: UpdateCartDTO,
    userId: string,
  ): Promise<CartEntity> {
    const cart = await this.findCartByUserId(userId).catch(async () => {
      return this.createCart(userId);
    });

    await this.cartProductService.updateProductInCart(updateCartDto, cart);

    return cart;
  }

  async deleteProductCart(
    productId: string,
    userId: string,
  ): Promise<DeleteResult> {
    const cart = await this.findCartByUserId(userId);
    return this.cartProductService.deleteProductCart(productId, cart.id);
  }
}
