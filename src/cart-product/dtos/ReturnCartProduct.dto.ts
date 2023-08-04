import { ReturnCartDto } from '../../cart/dtos/ReturnCart.dto';
import { ReturnProductDto } from '../../product/dtos/ReturnProduct.dto';
import { CartProductEntity } from '../entities/cart-product.entity';

export class ReturnCartProductDto {
  id: string;
  cartId: string;
  productId: string;
  amount: number;
  product?: ReturnProductDto;
  cart?: ReturnCartDto;

  constructor(cartProduct: CartProductEntity) {
    this.id = cartProduct.id;
    this.cartId = cartProduct.cartId;
    this.productId = cartProduct.productId;
    this.amount = cartProduct.amount;
    this.product = cartProduct.product
      ? new ReturnProductDto(cartProduct.product)
      : undefined;
    this.cart = cartProduct.cart
      ? new ReturnCartDto(cartProduct.cart)
      : undefined;
  }
}
