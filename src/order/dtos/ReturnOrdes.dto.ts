import { ReturnAddressDto } from '../../address/dtos/ReturnAddress.dto';
import { ReturnUserDto } from '../../user/dtos/ReturnUser.dto';
import { OrderEntity } from '../entities/order.entity';
import { ReturnPaymentDTO } from '../../payment/dtos/ReturnPayment.dto';
import { ReturnOrderProductDTO } from '../../order-product/dtos/ReturnOrderProduct.dto';

export class ReturnOrderDTO {
  id: string;
  date: string;
  userId: string;
  addressId: string;
  paymentId: string;
  user?: ReturnUserDto;
  address: ReturnAddressDto;
  payment: ReturnPaymentDTO;
  ordersproduct: ReturnOrderProductDTO[];

  constructor(order: OrderEntity) {
    this.id = order.id;
    this.date = order.date.toString();
    this.userId = order.userId;
    this.addressId = order.addressId;
    this.paymentId = order.paymentId;
    this.user = order.user ? new ReturnUserDto(order.user) : undefined;
    this.address = order.address
      ? new ReturnAddressDto(order.address)
      : undefined;
    this.payment = order.payment
      ? new ReturnPaymentDTO(order.payment)
      : undefined;
    this.ordersproduct = order.ordersProduct
      ? order.ordersProduct.map(
          (orderProduct) => new ReturnOrderProductDTO(orderProduct),
        )
      : undefined;
  }
}
