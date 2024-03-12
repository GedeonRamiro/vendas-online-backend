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
import { Roles } from 'src/decorator/roles.decorator';
import { UserType } from 'src/user/enum/user-type.enum';
import { ReturnOrderDTO } from './dtos/ReturnOrdes.dto';

@Roles(UserType.Admin, UserType.User)
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createOrder(
    @Body() createOrderDTO: CreateOrderDto,
    @UserId() userId: string,
  ) {
    return this.orderService.createOrder(createOrderDTO, userId);
  }

  @Get()
  async findOrdersByUserId(@UserId() userId: string): Promise<OrderEntity[]> {
    return this.orderService.findOrdersByUserId(userId);
  }

  @Get('all')
  async findAllOrders(): Promise<ReturnOrderDTO[]> {
    return (await this.orderService.findAllOrders()).map(
      (order) => new ReturnOrderDTO(order),
    );
  }
}
