import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
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

  @Post()
  async create(@Body() data: CreatePartyDto) {
    const result = await this.partyService.create(data);
    return result;
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    const result = await this.partyService.findById(id);
    return result;
  }

  @Delete(':id')
  async deleteById(@Param('id') id: number) {
    const result = await this.partyService.deleteById(id);
    return result;
  }
}
