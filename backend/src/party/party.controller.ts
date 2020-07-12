import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { RoleGuard, Roles } from '../guards/roles-guard';

import { PartyService } from './party.service';
import { CreatePartyDto } from './dto/create-party.dto';
@Controller('parties')
export class PartyController {
  constructor(private readonly partyService: PartyService) {}

  @Get()
  async findAll() {
    const result = await this.partyService.findAll();
    return result;
  }

  @Patch(':id')
  @UseGuards(RoleGuard)
  @Roles(['admin'])
  async updateById(@Param('id') id: number, @Body() data: CreatePartyDto) {
    const result = await this.partyService.updateById(id, data);
    return result;
  }

  @Post()
  @UseGuards(RoleGuard)
  @Roles(['admin'])
  async create(@Body() data: CreatePartyDto) {
    const result = await this.partyService.create(data);
    return result;
  }

  @Get(':id')
  @UseGuards(RoleGuard)
  async findById(@Param('id') id: number) {
    const result = await this.partyService.findById(id);
    return result;
  }

  @Delete(':id')
  @UseGuards(RoleGuard)
  @Roles(['admin'])
  async deleteById(@Param('id') id: number) {
    const result = await this.partyService.deleteById(id);
    return result;
  }
}
