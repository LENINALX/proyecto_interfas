// backend-transporte/src/auth/dto/register.dto.ts
import { IsEmail, IsString, MinLength, IsNotEmpty } from 'class-validator'; // Añade IsNotEmpty

export class RegisterDto {
  @IsEmail({}, { message: 'El formato del correo electrónico es inválido.' }) // Añadido mensaje
  @IsNotEmpty({ message: 'El correo electrónico no puede estar vacío.' }) // Añadido
  email: string;

  @IsString({ message: 'La contraseña debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'La contraseña no puede estar vacía.' }) // Añadido
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;

  @IsString({ message: 'El nombre de usuario debe ser una cadena de texto.' }) // Añadido mensaje
  @IsNotEmpty({ message: 'El nombre de usuario no puede estar vacío.' }) // Añadido
  @MinLength(3, { message: 'El nombre de usuario debe tener al menos 3 caracteres' })
  username: string;
}