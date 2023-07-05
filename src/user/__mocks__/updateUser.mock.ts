import { UpdatePasswordUserDto } from '../dtos/UpdatePasswordUser.dto';

export const updatePasswordMock: UpdatePasswordUserDto = {
  lastPassword: '123456',
  newPassword: '123456789',
};

export const updatePassworInvaliddMock: UpdatePasswordUserDto = {
  lastPassword: 'qwerty',
  newPassword: 'qwewetryt',
};
