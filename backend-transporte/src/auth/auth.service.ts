// src/auth/auth.service.ts
import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm'; // Importa Repository
import { InjectRepository } from '@nestjs/typeorm'; // Importa InjectRepository
import { User } from './entities/user.entity'; // ¡Importa la ENTIDAD de usuario!

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) // Inyecta el repositorio de la entidad User
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { email, password, username } = registerDto;

    // 1. Verificar si el usuario ya existe en la base de datos
    const existingUser = await this.usersRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new ConflictException('El email ya está registrado.');
    }

    // 2. Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Crear una nueva instancia de la entidad User
    const newUser = this.usersRepository.create({
      email,
      username,
      password: hashedPassword,
    });

    // 4. Guardar el nuevo usuario en la base de datos
    await this.usersRepository.save(newUser);

    console.log('Nuevo usuario registrado en DB:', newUser);

    // 5. Retornar solo la información segura del usuario (sin la contraseña hasheada)
    const { password: _, ...result } = newUser;
    return result;
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // 1. Encontrar al usuario por email en la base de datos
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // 2. Comparar la contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // 3. Generar JWT
    const payload = { email: user.email, sub: user.id, username: user.username };
    const accessToken = this.jwtService.sign(payload);

    // 4. Retornar el token y los datos del usuario
    const { password: _, ...userData } = user; // Excluir la contraseña del objeto retornado
    return {
      access_token: accessToken,
      user: userData,
    };
  }
}