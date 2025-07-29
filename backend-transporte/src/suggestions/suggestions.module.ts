import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Suggestion } from './suggestion.entity';
import { SuggestionsService } from './suggestions.service';
import { SuggestionsController } from './suggestions.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Suggestion])],
  providers: [SuggestionsService],
  controllers: [SuggestionsController],
  exports: [SuggestionsService],
})
export class SuggestionsModule {}
