// backend-transporte/src/auth/interfaces/user.interface.ts
export interface User {
  id: number;
  email: string;
  username: string;
  role: string; // <-- ¡CRÍTICO: AÑADE ESTO!
  password?: string; // Make password optional if you won't return it
}