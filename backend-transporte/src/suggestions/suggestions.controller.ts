import { 
  Controller, Post, Body, Get, Patch, Param, ParseIntPipe, UseInterceptors, UploadedFile 
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

import { SuggestionsService } from './suggestions.service';
import { Suggestion } from './suggestion.entity';
import { CreateSuggestionDto } from './dto/create-suggestion.dto';
import { UpdateSuggestionDto } from './dto/update-suggestion.dto';

@Controller('suggestions')
export class SuggestionsController {
  constructor(private readonly suggestionsService: SuggestionsService) {}

  // --- NUEVO: Guarda sugerencia con archivo
  @Post()
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads', // carpeta raíz en backend-transporte/uploads
      filename: (req, file, cb) => {
        // Asigna un nombre único al archivo
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + extname(file.originalname));
      }
    }),
    limits: { fileSize: 4 * 1024 * 1024 }, // 4MB máximo
    fileFilter: (req, file, cb) => {
      // Opcional: limita tipos de archivos
      if (
        file.mimetype.startsWith('image/') ||
        file.mimetype === 'application/gpx+xml'
      ) {
        cb(null, true);
      } else {
        cb(new Error('Solo imágenes o archivos GPX permitidos'), false);
      }
    }
  }))
  async create(
    @Body() createDto: CreateSuggestionDto,
    @UploadedFile() file?: Express.Multer.File
  ) {
    // Si hay archivo, guarda su ruta en fileUrl
    if (file) {
      createDto.fileUrl = `/uploads/${file.filename}`;
    }
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
