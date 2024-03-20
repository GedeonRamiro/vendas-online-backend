import { ReturnOrderDTO } from '../../order/dtos/ReturnOrdes.dto';
import { ReturnProductDto } from '../../product/dtos/ReturnProduct.dto';
import { OrderProductEntity } from '../entities/order-product.entity';

export class ReturnOrderProductDTO {
  id: string;
  orderId: string;
  productId: string;
  amount: number;
  price: number;
  order?: ReturnOrderDTO;
  product?: ReturnProductDto;

  constructor(orderProduct: OrderProductEntity) {
    this.id = orderProduct.id;
    this.orderId = orderProduct.orderId;
    this.productId = orderProduct.productId;
    this.amount = orderProduct.amount;
    this.price = orderProduct.price;
    this.order = orderProduct.order
      ? new ReturnOrderDTO(orderProduct.order)
      : undefined;
    this.product = orderProduct.product
      ? new ReturnProductDto(orderProduct.product)
      : undefined;
  }
}
