import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CampanhasService } from './campanhas.service';
import { Campanha, Status } from './entities/campanha.entity';
import { CreateCampanhaDto } from './dto/create-campanha.dto';
import { UpdateCampanhaDto } from './dto/update-campanha.dto';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('CampanhasService', () => {
  let service: CampanhasService;
  let repository: Repository<Campanha>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CampanhasService,
        {
          provide: getRepositoryToken(Campanha),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<CampanhasService>(CampanhasService);
    repository = module.get<Repository<Campanha>>(getRepositoryToken(Campanha));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a campaign', async () => {
    const createCampanhaDto: CreateCampanhaDto = {
      nome: 'Test Campaign',
      dataInicio: new Date().toISOString(),
      dataFim: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(), // 1 day later
      status: Status.ATIVA,
      categoria: 'Test Category',
    };

    const createdCampaign = {
      ...createCampanhaDto,
      id: 1,
      dataCadastro: new Date(),
      dataInicio: new Date(createCampanhaDto.dataInicio),
      dataFim: new Date(createCampanhaDto.dataFim),
    };

    jest.spyOn(repository, 'create').mockReturnValue(createdCampaign as any);
    jest.spyOn(repository, 'save').mockResolvedValue(createdCampaign as any);

    const result = await service.create(createCampanhaDto);

    expect(result).toEqual(createdCampaign);
    expect(repository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        ...createCampanhaDto,
        dataCadastro: expect.any(Date),
        dataInicio: new Date(createCampanhaDto.dataInicio),
        dataFim: new Date(createCampanhaDto.dataFim),
      }),
    );
    expect(repository.save).toHaveBeenCalledWith(createdCampaign);
  });

  it('should fail to create a campaign if dataFim is before dataInicio', async () => {
    const createCampanhaDto: CreateCampanhaDto = {
      nome: 'Test Campaign',
      dataInicio: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(), // 1 day later
      dataFim: new Date().toISOString(),
      status: Status.ATIVA,
      categoria: 'Test Category',
    };

    await expect(service.create(createCampanhaDto)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should find all campaigns', async () => {
    const result = [{ id: 1, nome: 'Test Campaign' }];
    jest.spyOn(repository, 'find').mockResolvedValue(result as any);

    expect(await service.findAll()).toEqual(result);
    expect(repository.find).toHaveBeenCalledWith({
      where: { isDeleted: false },
    });
  });

  it('should find one campaign', async () => {
    const result = { id: 1, nome: 'Test Campaign' };
    jest.spyOn(repository, 'findOne').mockResolvedValue(result as any);

    expect(await service.findOne(1)).toEqual(result);
    expect(repository.findOne).toHaveBeenCalledWith({
      where: { id: 1, isDeleted: false },
    });
  });

  it('should fail to find one campaign if not found', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValue(null);

    await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
  });

  it('should update a campaign', async () => {
    const updateCampanhaDto: UpdateCampanhaDto = {
      nome: 'Updated Campaign',
      dataInicio: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(), // 1 day later
      dataFim: new Date(Date.now() + 1000 * 60 * 60 * 48).toISOString(), // 2 days later
    };
    const result = {
      id: 1,
      nome: 'Updated Campaign',
      dataInicio: new Date(updateCampanhaDto.dataInicio),
      dataFim: new Date(updateCampanhaDto.dataFim),
    };

    jest.spyOn(service, 'findOne').mockResolvedValue(result as any);
    jest.spyOn(repository, 'save').mockResolvedValue(result as any);

    expect(await service.update(1, updateCampanhaDto)).toEqual(result);
    expect(service.findOne).toHaveBeenCalledWith(1);
    expect(repository.save).toHaveBeenCalledWith(result);
  });

  it('should fail to update a campaign if dataFim is before dataInicio', async () => {
    const updateCampanhaDto: UpdateCampanhaDto = {
      nome: 'Test Campaign',
      dataInicio: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(), // 1 day later
      dataFim: new Date().toISOString(),
    };

    const existingCampaign = {
      id: 1,
      nome: 'Existing Campaign',
      dataInicio: new Date().toISOString(),
      dataFim: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(), // 1 day later
      status: Status.ATIVA,
      categoria: 'Test Category',
    };

    jest.spyOn(service, 'findOne').mockResolvedValue(existingCampaign as any);

    await expect(service.update(1, updateCampanhaDto)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should remove a campaign', async () => {
    const existingCampaign = { id: 1, nome: 'Test Campaign', isDeleted: false };
    const removedCampaign = { ...existingCampaign, isDeleted: true };

    jest.spyOn(service, 'findOne').mockResolvedValue(existingCampaign as any);
    jest.spyOn(repository, 'save').mockResolvedValue(removedCampaign as any);

    await service.remove(1);
    expect(existingCampaign.isDeleted).toBe(true);
    expect(repository.save).toHaveBeenCalledWith(existingCampaign);
  });
});
