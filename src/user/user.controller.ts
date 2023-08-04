import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { UserService } from './user.service';
import { ReturnUserDto } from './dtos/ReturnUser.dto';
import { Roles } from '../decorator/roles.decorator';
import { UserType } from './enum/user-type.enum';
import { UpdatePasswordUserDto } from './dtos/UpdatePasswordUser.dto';
import { UserId } from '../decorator/user-id.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async createUser(@Body() createUser: CreateUserDto) {
    return this.userService.createUser(createUser);
  }

  @Roles(UserType.Admin)
  @Get()
  async getAllUsers(): Promise<ReturnUserDto[]> {
    const users = (await this.userService.getAllUsers()).map(
      (userEntity) => new ReturnUserDto(userEntity),
    );

    return users;
  }

  @Roles(UserType.Admin)
  @Get(':id')
  async findUserById(@Param('id') id: string): Promise<ReturnUserDto> {
    return new ReturnUserDto(await this.userService.findUserById(id));
  }

  @Roles(UserType.Admin, UserType.User)
  @UsePipes(ValidationPipe)
  @Patch()
  async updateUser(
    @UserId('userId') userId: string,
    @Body() updateUser: UpdatePasswordUserDto,
  ) {
    return this.userService.updatePasswordUser(userId, updateUser);
  }
}
