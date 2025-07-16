// backend-transporte/src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller'; // Asegúrate de que esta importación sea correcta
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET', 'yourSuperSecretKey'),
        signOptions: { expiresIn: '60m' },
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  controllers: [AuthController], // <-- ¡Asegúrate que AuthController esté aquí!
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {} // <-- ¡Asegúrate que se exporte!