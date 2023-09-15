import { Test, TestingModule } from '@nestjs/testing';
import { StateController } from '../state.controller';
import { StateService } from '../state.service';
import { stateMock } from '../__mocks__/state.mock';

describe('StateController', () => {
  let controller: StateController;
  let stateService: StateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: StateService,
          useValue: {
            getAllStates: jest.fn().mockResolvedValue([stateMock]),
            getState: jest.fn().mockResolvedValue(stateMock),
          },
        },
      ],

      controllers: [StateController],
    }).compile();

    controller = module.get<StateController>(StateController);
    stateService = module.get<StateService>(StateService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(stateService).toBeDefined();
  });

  it('should return stateEntity in getAllState', async () => {
    const states = await controller.getAllStates();

    expect(states).toEqual([stateMock]);
  });

  it('should return stateEntity in getState', async () => {
    const states = await controller.getState(stateMock.id);

    expect(states).toEqual(stateMock);
  });
});
