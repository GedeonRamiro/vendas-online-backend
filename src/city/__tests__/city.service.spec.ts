import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CityService } from '../city.service';
import { CityEntity } from '../entities/city.entity';
import { cityMock } from '../__mocks__/city.mock';
import { stateMock } from '../../state/__mocks__/state.mock';

describe('CityService', () => {
  let service: CityService;
  let cityRepository: Repository<CityEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CityService,
        {
          provide: getRepositoryToken(CityEntity),
          useValue: {
            find: jest.fn().mockResolvedValue([cityMock]),
            findOneBy: jest.fn().mockResolvedValue(cityMock),
          },
        },
      ],
    }).compile();

    service = module.get<CityService>(CityService);
    cityRepository = module.get<Repository<CityEntity>>(
      getRepositoryToken(CityEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(cityRepository).toBeDefined();
  });

  it('should return lis of cities', async () => {
    const cities = await service.getAllCitiesByStateId(stateMock.id);

    expect(cities).toEqual([cityMock]);
  });

  it('should return error list of cities', async () => {
    jest.spyOn(cityRepository, 'find').mockRejectedValue(new Error());

    expect(service.getAllCitiesByStateId(stateMock.id)).rejects.toThrowError();
  });

  it('should return city in findCityById', async () => {
    const city = await service.findCityById(cityMock.id);

    expect(city).toEqual(cityMock);
  });

  it('should return error city in findCityById', async () => {
    jest.spyOn(cityRepository, 'findOneBy').mockRejectedValue(new Error());

    expect(service.findCityById(cityMock.id)).rejects.toThrowError();
  });
});
