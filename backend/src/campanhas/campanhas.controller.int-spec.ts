import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CampanhasService } from './campanhas.service';
import { CreateCampanhaDto } from './dto/create-campanha.dto';
import { UpdateCampanhaDto } from './dto/update-campanha.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Campanha } from './entities/campanha.entity';

@ApiTags('campanhas')
@Controller('campanhas')
export class CampanhasController {
  constructor(private readonly campanhasService: CampanhasService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new campaign' })
  @ApiResponse({
    status: 201,
    description: 'The campaign has been successfully created.',
    type: Campanha,
  })
  create(@Body() createCampanhaDto: CreateCampanhaDto) {
    return this.campanhasService.create(createCampanhaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all campaigns' })
  @ApiResponse({
    status: 200,
    description: 'Return all campaigns.',
    type: [Campanha],
  })
  findAll() {
    return this.campanhasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a campaign by id' })
  @ApiResponse({
    status: 200,
    description: 'Return a campaign.',
    type: Campanha,
  })
  @ApiResponse({ status: 404, description: 'Campaign not found.' })
  findOne(@Param('id') id: string) {
    return this.campanhasService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a campaign' })
  @ApiResponse({
    status: 200,
    description: 'The campaign has been successfully updated.',
    type: Campanha,
  })
  update(
    @Param('id') id: string,
    @Body() updateCampanhaDto: UpdateCampanhaDto,
  ) {
    return this.campanhasService.update(+id, updateCampanhaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a campaign' })
  @ApiResponse({
    status: 200,
    description: 'The campaign has been successfully deleted.',
  })
  remove(@Param('id') id: string) {
    return this.campanhasService.remove(+id);
  }
}
