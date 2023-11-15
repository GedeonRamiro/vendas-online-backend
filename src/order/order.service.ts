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
import { ProductEntity } from 'src/product/entities/product.entity';
import { CartEntity } from 'src/cart/entities/cart.entity';
import { OrderProductEntity } from 'src/order-product/entities/order-product.entity';

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

  async saveOrder(
    createOrder: CreateOrderDto,
    userId: string,
    payment: PaymentEntity,
  ): Promise<OrderEntity> {
    return this.OrderRepository.save({
      addressId: createOrder.addressId,
      date: new Date(),
      paymentId: payment.id,
      userId,
    });
  }

  async createOrderproductUsingCart(
    cart: CartEntity,
    orderId: string,
    products: ProductEntity[],
  ): Promise<OrderProductEntity[]> {
    return Promise.all(
      cart.cartProduct?.map((cartProduct) =>
        this.orderProductService.createOrderProduct(
          cartProduct.productId,
          orderId,
          products.find((product) => product.id === cartProduct.productId)
            ?.price || 0,
          cartProduct.amount,
        ),
      ),
    );
  }

  async createOrder(
    createOrderDto: CreateOrderDto,
    userId: string,
  ): Promise<OrderEntity> {
    const cart = await this.cartService.findCartByUserId(userId, true);

    const products = await this.productService.findAllProducts(
      cart.cartProduct?.map((cartProduct) => cartProduct.productId),
    );

    const payment: PaymentEntity = await this.paymentService.createPayment(
      createOrderDto,
      products,
      cart,
    );
    const order = await this.saveOrder(createOrderDto, userId, payment);

    await this.createOrderproductUsingCart(cart, order.id, products);

    //await this.cartService.clearCart(userId);

    return order;
  }
}
