import { UserEntity } from '../entities/user.entity';
import { UserType } from '../enum/user-type.enum';

export const userEntityMock: UserEntity = {
  cpf: '123543543',
  email: 'akira@homal.com',
  id: 'sd267d9f9g9dfg09a87hg8fdgf',
  name: 'nameMock',
  password: '$2b$10$0BKRhYK75pE63EW/v7k4S.RTzp86e/Bz9Sr2W7/D.Qg3bZQaJcWBC',
  phone: '321532523532',
  typeUser: UserType.User,
  createdAt: new Date(),
  updatedAt: new Date(),
};
