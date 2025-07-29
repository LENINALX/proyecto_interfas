import { Controller, Post, Body, Get, Patch, Param, ParseIntPipe } from '@nestjs/common';
import { SuggestionsService } from './suggestions.service';
import { Suggestion } from './suggestion.entity';
import { CreateSuggestionDto } from './dto/create-suggestion.dto';
import { UpdateSuggestionDto } from './dto/update-suggestion.dto';

@Controller('suggestions')
export class SuggestionsController {
  constructor(private readonly suggestionsService: SuggestionsService) {}

  @Post()
  async create(@Body() createDto: CreateSuggestionDto) {
    return this.suggestionsService.create(createDto);
  }

  @Get()
  async findAll(): Promise<Suggestion[]> {
    return this.suggestionsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Suggestion> {
    return this.suggestionsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateSuggestionDto,
  ) {
    return this.suggestionsService.update(id, updateDto);
  }
}
