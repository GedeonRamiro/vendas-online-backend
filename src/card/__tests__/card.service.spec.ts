import { Test, TestingModule } from '@nestjs/testing';
import { CardService } from '../card.service';
import { Repository } from 'typeorm';
import { CardEntity } from '../entities/card.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('CardService', () => {
  let service: CardService;
  let cardRepository: Repository<CardEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CardService,
        {
          provide: getRepositoryToken(CardEntity),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<CardService>(CardService);
    cardRepository = module.get<Repository<CardEntity>>(
      getRepositoryToken(CardEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(cardRepository).toBeDefined();
  });
});
