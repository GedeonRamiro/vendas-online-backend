import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { StateService } from '../state.service';
import { StateEntity } from '../entities/state.entity';
import { stateMock } from '../__mocks__/state.mock';

describe('StateService', () => {
  let service: StateService;
  let stateRepository: Repository<StateEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StateService,
        {
          provide: getRepositoryToken(StateEntity),
          useValue: {
            find: jest.fn().mockResolvedValue([stateMock]),
            findOneBy: jest.fn().mockResolvedValue(stateMock),
          },
        },
      ],
    }).compile();

    service = module.get<StateService>(StateService);
    stateRepository = module.get<Repository<StateEntity>>(
      getRepositoryToken(StateEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(stateRepository).toBeDefined();
  });

  it('should return lis of states', async () => {
    const state = await service.getAllStates();

    expect(state).toEqual([stateMock]);
  });

  it('should return error list of states', async () => {
    jest.spyOn(stateRepository, 'find').mockRejectedValue(new Error());

    expect(service.getAllStates()).rejects.toThrowError();
  });

  it('should return state in getStateId', async () => {
    const state = await service.getState(stateMock.id);

    expect(state).toEqual(stateMock);
  });

  it('should return error state in getStateId', async () => {
    jest.spyOn(stateRepository, 'findOneBy').mockRejectedValue(new Error());

    expect(service.getState(stateMock.id)).rejects.toThrowError();
  });
});
