// backend-transporte/src/auth/entities/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  username: string;

  @Column()
  password: string; // La contraseña siempre se almacenará hasheada

  // --- ¡AÑADE ESTO! ---
  @Column({ default: 'user' }) // Por defecto, los usuarios registrados serán 'user'
  role: string; // Puede ser 'user', 'admin', u otros roles que definas
}