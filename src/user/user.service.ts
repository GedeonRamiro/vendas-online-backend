import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PasswordBcryptjs } from '../utils/PasswordBcrypt';
import { UpdatePasswordUserDto } from './dtos/UpdatePasswordUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    await this.existEmail(createUserDto.email);
    const saltOrRounds = 10;

    const passwordHashed = await PasswordBcryptjs.hashPasswords(
      createUserDto.password,
    );

    return await this.userRepository.save({
      ...createUserDto,
      typeUser: 1,
      password: passwordHashed,
    });
  }

  async updatePasswordUser(
    userId: string,
    updatePasswordUserDto: UpdatePasswordUserDto,
  ): Promise<UserEntity> {
    const user = await this.findUserById(userId);

    const newPasswordHashed = await PasswordBcryptjs.hashPasswords(
      updatePasswordUserDto.newPassword,
    );

    const isMatch = await PasswordBcryptjs.verifyPasswords(
      updatePasswordUserDto.lastPassword,
      user.password,
    );

    if (!isMatch) {
      throw new BadRequestException('Last password invalid');
    }

    await this.userRepository.update(userId, { password: newPasswordHashed });

    return user;
  }

  async getAllUsers(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async findUserById(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: {
        addresses: {
          city: {
            state: true,
          },
        },
      },
    });

    if (!user) throw new NotFoundException(`Usuário com id ${id} não existe!`);

    return user;
  }

  async existEmail(email: string) {
    const user = await this.userRepository.findOneBy({
      email,
    });

    if (user) {
      throw new BadGatewayException('Erro ao cadastrar usuário!');
    }

    return true;
  }

  async findUserByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundException(`Email: ${email} Not Found`);
    }

    return user;
  }
}
