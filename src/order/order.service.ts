import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dtos/CreateOrder.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly OrderEntity: Repository<OrderEntity>,
  ) {}

  async createOrder(createOrder: CreateOrderDto, cartId: string) {
    return null;
  }
}
