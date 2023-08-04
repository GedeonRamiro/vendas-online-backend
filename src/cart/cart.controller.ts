import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
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
import { ReturnCartDto } from './dtos/ReturnCart.dto';
import { UpdateCartDTO } from './dtos/UpdateCart.dto';
import { DeleteResult } from 'typeorm';

@Roles(UserType.User, UserType.Admin)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  async findCartByUserId(@UserId() userId): Promise<ReturnCartDto> {
    return new ReturnCartDto(
      await this.cartService.findCartByUserId(userId, true),
    );
  }

  @UsePipes(ValidationPipe)
  @Post()
  async createCart(
    @Body() insertCart: InsertCartDTO,
    @UserId() userId: string,
  ): Promise<ReturnCartDto> {
    return new ReturnCartDto(
      await this.cartService.insertProductInCart(insertCart, userId),
    );
  }

  @UsePipes(ValidationPipe)
  @Patch()
  async updateCart(
    @Body() updateCart: UpdateCartDTO,
    @UserId() userId: string,
  ): Promise<ReturnCartDto> {
    return new ReturnCartDto(
      await this.cartService.updateProductInCart(updateCart, userId),
    );
  }

  @Delete('/product/:productId')
  async deleteProductCart(
    @Param('productId') productId: string,
    @UserId() userId: string,
  ): Promise<DeleteResult> {
    return await this.cartService.deleteProductCart(productId, userId);
  }
}
