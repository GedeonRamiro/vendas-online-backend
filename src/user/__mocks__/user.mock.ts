import { UserEntity } from '../entities/user.entity';
import { UserType } from '../enum/user-type.enum';

export const userEntityMock: UserEntity = {
  cpf: '123543543',
  email: 'emailmock@emali.com',
  id: 'sd267d9f9g9dfg09a87hg8fdgf',
  name: 'nameMock',
  password: 'largePassword',
  phone: '321532523532',
  typeUser: UserType.User,
  createdAt: new Date(),
  updatedAt: new Date(),
};
