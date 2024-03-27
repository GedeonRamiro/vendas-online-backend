import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dtos/CreateOrder.dto';
import { UserId } from '../decorator/user-id.decorator';
import { OrderEntity } from './entities/order.entity';
import { Roles } from '../decorator/roles.decorator';
import { UserType } from '../user/enum/user-type.enum';
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

  @Roles(UserType.Admin)
  @Get('all')
  async findAllOrders(): Promise<ReturnOrderDTO[]> {
    return (await this.orderService.findAllOrders()).map(
      (order) => new ReturnOrderDTO(order),
    );
  }

  @Roles(UserType.Admin)
  @Get(':orderId')
  async findOrderById(
    @Param('orderId') orderId: string,
  ): Promise<ReturnOrderDTO> {
    return new ReturnOrderDTO(
      (await this.orderService.findOrdersByUserId(undefined, orderId))[0],
    );
  }
}
