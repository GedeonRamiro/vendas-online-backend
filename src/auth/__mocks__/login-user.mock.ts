import { userEntityMock } from '../../user/__mocks__/user.mock';
import { LoginDto } from '../dtos/LoginDto';

export const loginUserMock: LoginDto = {
  email: userEntityMock.email,
  password: '123456',
};
