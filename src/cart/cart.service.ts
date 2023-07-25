import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartEntity } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { InsertCartDTO } from './dtos/InsertCart.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,
  ) {}

  async verifyActiveCart(userId: string): Promise<CartEntity> {
    const cart = await this.cartRepository.findOne({
      where: { userId },
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
    insertCart: InsertCartDTO,
    userId: string,
  ): Promise<CartEntity> {
    const cart = this.verifyActiveCart(userId).catch(async () => {
      return this.createCart(userId);
    });

    return cart;
  }
}
