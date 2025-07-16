// backend-transporte/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'; // Importa ValidationPipe

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS
  app.enableCors({
    origin: 'http://localhost:3000', // Permite solicitudes solo desde tu frontend React
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Habilitar validación global de DTOs
  app.useGlobalPipes(new ValidationPipe({
    transform: true, // Esto transforma los payloads a instancias de DTO
    whitelist: true, // Elimina propiedades que no están definidas en el DTO
    forbidNonWhitelisted: true, // Lanza un error si hay propiedades no definidas
  }));

  const port = 3001; // Puedes obtenerlo de ConfigService si lo deseas
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();