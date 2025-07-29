// src/suggestions/suggestions.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Suggestion } from './suggestion.entity';
import { CreateSuggestionDto } from './dto/create-suggestion.dto';
import { UpdateSuggestionDto } from './dto/update-suggestion.dto';

@Injectable()
export class SuggestionsService {
  findOne(id: number): Suggestion | PromiseLike<Suggestion> {
      throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(Suggestion)
    private readonly suggestionsRepository: Repository<Suggestion>,
  ) {}

  async create(suggestionDto: Partial<Suggestion> | CreateSuggestionDto) {
    const suggestion = this.suggestionsRepository.create(suggestionDto);
    return this.suggestionsRepository.save(suggestion);
  }

  async findAll(): Promise<Suggestion[]> {
    return this.suggestionsRepository.find({ order: { createdAt: 'DESC' } });
  }

  async update(id: number, updateDto: UpdateSuggestionDto) {
    await this.suggestionsRepository.update(id, updateDto);
    return this.suggestionsRepository.findOne({ where: { id } });
  }
}
