import { stateMock } from '../../state/__mocks__/state.mock';
import { CityEntity } from '../entities/city.entity';

export const cityMock: CityEntity = {
  id: '6543543',
  name: 'cityName',
  state_id: stateMock.id,
  createdAt: new Date(),
  updatedAt: new Date(),
};
