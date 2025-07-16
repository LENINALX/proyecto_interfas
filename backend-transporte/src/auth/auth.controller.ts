// src/auth/auth.controller.ts
import { Controller, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto'; // Importa LoginDto

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @HttpCode(HttpStatus.OK) // Set status code to 200 OK for successful login
  @Post('login') // <-- Nuevo endpoint para login
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}