import { IsNotEmpty, IsISO8601, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Status } from '../entities/campanha.entity';

export class CreateCampanhaDto {
  @ApiProperty({
    example: 'New Year Campaign',
    description: 'The name of the campaign',
  })
  @IsNotEmpty()
  nome: string;

  @ApiProperty({
    example: '2024-01-01T00:00:00Z',
    description: 'The start date of the campaign',
    type: String,
    format: 'date-time',
  })
  @IsISO8601()
  dataInicio: string;

  @ApiProperty({
    example: '2024-01-31T23:59:59Z',
    description: 'The end date of the campaign',
    type: String,
    format: 'date-time',
  })
  @IsISO8601()
  dataFim: string;

  @ApiProperty({
    example: 'ATIVA',
    description: 'The status of the campaign',
    enum: Status,
  })
  @IsEnum(Status)
  status: Status;

  @ApiProperty({
    example: 'Marketing',
    description: 'The category of the campaign',
  })
  @IsNotEmpty()
  categoria: string;
}
