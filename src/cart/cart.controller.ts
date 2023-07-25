import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CartEntity } from './entities/cart.entity';
import { InsertCartDTO } from './dtos/InsertCart.dto';
import { UserId } from 'src/decorator/user-id.decorator';
import { Roles } from 'src/decorator/roles.decorator';
import { UserType } from 'src/user/enum/user-type.enum';

@Roles(UserType.User, UserType.Admin)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async createCart(
    @Body() insertCart: InsertCartDTO,
    @UserId() userId: string,
  ): Promise<CartEntity> {
    return await this.cartService.insertProductInCart(insertCart, userId);
  }
}
