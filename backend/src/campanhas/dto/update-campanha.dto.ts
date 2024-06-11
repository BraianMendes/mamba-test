import { PartialType } from '@nestjs/swagger';
import { CreateCampanhaDto } from './create-campanha.dto';

export class UpdateCampanhaDto extends PartialType(CreateCampanhaDto) {}
