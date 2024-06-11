import { Test, TestingModule } from '@nestjs/testing';
import { CampanhasController } from './campanhas.controller';
import { CampanhasService } from './campanhas.service';
import { CreateCampanhaDto } from './dto/create-campanha.dto';
import { UpdateCampanhaDto } from './dto/update-campanha.dto';
import { Status } from './entities/campanha.entity';

describe('CampanhasController', () => {
  let controller: CampanhasController;
  let service: CampanhasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CampanhasController],
      providers: [
        {
          provide: CampanhasService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CampanhasController>(CampanhasController);
    service = module.get<CampanhasService>(CampanhasService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a campaign', async () => {
    const createCampanhaDto: CreateCampanhaDto = {
      nome: 'Test Campaign',
      dataInicio: new Date().toISOString(),
      dataFim: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(), // 1 day later
      status: Status.ATIVA,
      categoria: 'Test Category',
    };
    const result = { ...createCampanhaDto, id: 1 };

    jest.spyOn(service, 'create').mockResolvedValue(result as any);

    expect(await controller.create(createCampanhaDto)).toEqual(result);
    expect(service.create).toHaveBeenCalledWith(createCampanhaDto);
  });

  it('should find all campaigns', async () => {
    const result = [{ id: 1, nome: 'Test Campaign' }];
    jest.spyOn(service, 'findAll').mockResolvedValue(result as any);

    expect(await controller.findAll()).toEqual(result);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should find one campaign', async () => {
    const result = { id: 1, nome: 'Test Campaign' };
    jest.spyOn(service, 'findOne').mockResolvedValue(result as any);

    expect(await controller.findOne('1')).toEqual(result);
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it('should update a campaign', async () => {
    const updateCampanhaDto: UpdateCampanhaDto = { nome: 'Updated Campaign' };
    const result = { id: 1, nome: 'Updated Campaign' };

    jest.spyOn(service, 'update').mockResolvedValue(result as any);

    expect(await controller.update('1', updateCampanhaDto)).toEqual(result);
    expect(service.update).toHaveBeenCalledWith(1, updateCampanhaDto);
  });

  it('should remove a campaign', async () => {
    jest.spyOn(service, 'remove').mockResolvedValue(undefined);

    expect(await controller.remove('1')).toBeUndefined();
    expect(service.remove).toHaveBeenCalledWith(1);
  });
});
