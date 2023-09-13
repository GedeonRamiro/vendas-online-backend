import { userEntityMock } from '../../user/__mocks__/user.mock';
import { jwtMock } from './jwt.mock';
import { ReturnLoginDto } from '../dtos/ReturnLoginDto';
import { ReturnUserDto } from '../../user/dtos/ReturnUser.dto';

export const returnLoginMock: ReturnLoginDto = {
  user: new ReturnUserDto(userEntityMock),
  accessToken: jwtMock,
};
