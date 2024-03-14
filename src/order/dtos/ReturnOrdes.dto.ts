import { ReturnAddressDto } from '../../address/dtos/ReturnAddress.dto';
import { ReturnUserDto } from '../../user/dtos/ReturnUser.dto';
import { OrderEntity } from '../entities/order.entity';
import { ReturnPaymentDTO } from '../../payment/dtos/ReturnPayment.dto';
import { OrderProductEntity } from '../../order-product/entities/order-product.entity';

export class ReturnOrderDTO {
  id: string;
  date: string;
  user?: ReturnUserDto;
  address: ReturnAddressDto;
  payment: ReturnPaymentDTO;
  ordersproduct: OrderProductEntity[];

  constructor(order: OrderEntity) {
    (this.id = order.id), (this.date = order.date.toString());
    this.user = order.user ? new ReturnUserDto(order.user) : undefined;
    this.address = order.address
      ? new ReturnAddressDto(order.address)
      : undefined;
    this.payment = order.payment
      ? new ReturnPaymentDTO(order.payment)
      : undefined;
    this.ordersproduct = order.ordersProduct;
  }
}
