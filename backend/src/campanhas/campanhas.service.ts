import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Campanha, Status } from './entities/campanha.entity';
import { CreateCampanhaDto } from './dto/create-campanha.dto';
import { UpdateCampanhaDto } from './dto/update-campanha.dto';

@Injectable()
export class CampanhasService {
  constructor(
    @InjectRepository(Campanha)
    private campanhasRepository: Repository<Campanha>,
  ) {}

  async create(createCampanhaDto: CreateCampanhaDto): Promise<Campanha> {
    const { dataInicio, dataFim } = createCampanhaDto;

    const dataInicioDate = new Date(dataInicio);
    const dataFimDate = new Date(dataFim);

    if (dataFimDate <= dataInicioDate) {
      throw new BadRequestException(
        'A data de fim deve ser maior que a data de início.',
      );
    }

    const campanha = this.campanhasRepository.create({
      ...createCampanhaDto,
      dataInicio: dataInicioDate,
      dataFim: dataFimDate,
      dataCadastro: new Date(),
    });

    if (dataFimDate < new Date()) {
      campanha.status = Status.EXPIRADA;
    }

    return this.campanhasRepository.save(campanha);
  }

  async findAll(): Promise<Campanha[]> {
    return this.campanhasRepository.find({ where: { isDeleted: false } });
  }

  async findOne(id: number): Promise<Campanha> {
    const campanha = await this.campanhasRepository.findOne({
      where: { id, isDeleted: false },
    });
    if (!campanha) {
      throw new NotFoundException(`Campanha com ID ${id} não encontrada.`);
    }
    return campanha;
  }

  async update(
    id: number,
    updateCampanhaDto: UpdateCampanhaDto,
  ): Promise<Campanha> {
    const campanha = await this.findOne(id);

    if (updateCampanhaDto.dataInicio && updateCampanhaDto.dataFim) {
      if (
        new Date(updateCampanhaDto.dataFim) <=
        new Date(updateCampanhaDto.dataInicio)
      ) {
        throw new BadRequestException(
          'A data de fim deve ser maior que a data de início.',
        );
      }
    }

    Object.assign(campanha, updateCampanhaDto);

    if (new Date(campanha.dataFim) < new Date()) {
      campanha.status = Status.EXPIRADA;
    }

    return this.campanhasRepository.save(campanha);
  }

  async remove(id: number): Promise<void> {
    const campanha = await this.findOne(id);
    campanha.isDeleted = true;
    await this.campanhasRepository.save(campanha);
  }
}
