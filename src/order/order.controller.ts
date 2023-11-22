import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dtos/CreateOrder.dto';
import { UserId } from '../decorator/user-id.decorator';
import { OrderEntity } from './entities/order.entity';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createOrder(
    @Body() createOrder: CreateOrderDto,
    @UserId('userId') userId: string,
  ) {
    return this.orderService.createOrder(createOrder, userId);
  }

  @Get()
  async findOrdersByUserId(@UserId() userId: string): Promise<OrderEntity[]> {
    return this.orderService.findOrdersByUserId(userId);
  }
}
