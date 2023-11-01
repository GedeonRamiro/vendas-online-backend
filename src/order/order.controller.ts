import {
  Body,
  Controller,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dtos/CreateOrder.dto';
import { UserId } from '../decorator/user-id.decorator';

@Controller('order')
export class OrderController {
  constructor(private readonly OrderService: OrderService) {}

  @Post('cart/:cartId')
  @UsePipes(ValidationPipe)
  async createOrder(
    @Body() createOrder: CreateOrderDto,
    @Param() cartId: string,
    @UserId('userId') userId: string,
  ) {
    return this.OrderService.createOrder(createOrder, cartId, userId);
  }
}
