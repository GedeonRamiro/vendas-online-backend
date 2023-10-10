import {
  Body,
  Controller,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { Validate } from 'class-validator';
import { CreateOrderDto } from './dtos/CreateOrder.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly OrderService: OrderService) {}

  @Post('cart/:cartId')
  @UsePipes(ValidationPipe)
  async createOrder(
    @Body() createOrder: CreateOrderDto,
    @Param() cartId: string,
  ) {
    return this.OrderService.createOrder(createOrder, cartId);
  }
}
