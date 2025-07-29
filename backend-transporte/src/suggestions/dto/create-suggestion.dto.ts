// src/suggestions/dto/create-suggestion.dto.ts
import { IsString, IsOptional, IsArray, IsIn, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSuggestionDto {
  @IsString()
  title: string;

  @IsString()
  @IsIn(['Bus', 'Ciclismo'])
  type: string;

  @IsString()
  shortDesc: string;

  @Type(() => Number)
  @IsNumber()
  distance: number;

  @IsString()
  duration: string;

  @IsString()
  @IsIn(['Fácil', 'Intermedia', 'Difícil'])
  difficulty: string;

  @IsArray()
  @IsOptional()
  categories?: string[];

  @IsString()
  @IsOptional()
  fileUrl?: string;

  @IsString()
  zone: string;

  @IsString()
  @IsIn(['Pública', 'Privada'])
  visibility: string;
}
