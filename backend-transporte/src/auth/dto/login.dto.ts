// backend-transporte/src/auth/dto/login.dto.ts
import { IsEmail, IsString, MinLength, IsNotEmpty } from 'class-validator'; // Añade IsNotEmpty

export class LoginDto {
  @IsEmail({}, { message: 'El formato del correo electrónico es inválido.' })
  @IsNotEmpty({ message: 'El correo electrónico no puede estar vacío.' }) // Añadido
  email: string;

  @IsString({ message: 'La contraseña debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'La contraseña no puede estar vacía.' }) // Añadido
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres.' })
  password: string;
}