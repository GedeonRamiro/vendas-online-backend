import { ReturnUserDto } from '../../user/dtos/ReturnUser.dto';
import { OrderEntity } from '../entities/order.entity';

export class ReturnOrderDTO {
  id: string;
  date: string;
  user?: ReturnUserDto;

  constructor(order: OrderEntity) {
    (this.id = order.id), (this.date = order.date.toDateString());
    this.user = order.user ? new ReturnUserDto(order.user) : undefined;
  }
}
