import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampanhasService } from './campanhas.service';
import { CampanhasController } from './campanhas.controller';
import { Campanha } from './entities/campanha.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Campanha])],
  controllers: [CampanhasController],
  providers: [CampanhasService],
})
export class CampanhasModule {}
