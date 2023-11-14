import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dtos/CreateOrder.dto';
import { PaymentService } from '../payment/payment.service';
import { PaymentEntity } from '../payment/entities/payment.entity';
import { CartService } from 'src/cart/cart.service';
import { OrderProductService } from 'src/order-product/order-product.service';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly OrderRepository: Repository<OrderEntity>,
    private readonly paymentService: PaymentService,
    private readonly cartService: CartService,
    private readonly orderProductService: OrderProductService,
    private readonly productService: ProductService,
  ) {}

  async createOrder(
    createOrder: CreateOrderDto,
    cartId: string,
    userId: string,
  ): Promise<OrderEntity> {
    const payment: PaymentEntity = await this.paymentService.createPayment(
      createOrder,
    );

    const order = await this.OrderRepository.save({
      addressId: createOrder.addressId,
      date: new Date(),
      paymentId: payment.id,
      userId,
    });

    const cart = await this.cartService.findCartByUserId(userId, true);

    const products = await this.productService.findAllProducts(
      cart.cartProduct?.map((cartProduct) => cartProduct.productId),
    );

    await Promise.all(
      cart.cartProduct.map((cartProduct) => {
        this.orderProductService.createOrderProduct(
          cartProduct.productId,
          order.id,
          products.find((product) => product.id === cartProduct.productId)
            ?.price || 0,
          cartProduct.amount,
        );
      }),
    );

    return order;
  }
}
