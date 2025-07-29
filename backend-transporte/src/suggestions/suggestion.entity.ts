import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Suggestion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string; // Título de la ruta

  @Column()
  type: string; // Bus o Ciclismo

  @Column()
  shortDesc: string; // Descripción corta

  @Column({ type: 'float' })
  distance: number; // Distancia estimada

  @Column()
  duration: string; // Duración aproximada

  @Column()
  difficulty: string; // Fácil / Intermedia / Difícil

  @Column({ type: 'json', nullable: true })
  categories: string[]; // Array de categorías

  @Column({ nullable: true })
  fileUrl: string; // URL o nombre de archivo (se puede adaptar a tu método de subida)

  @Column()
  zone: string; // Ciudad / Zona

  @Column()
  visibility: string; // Pública / Privada

  @CreateDateColumn()
  createdAt: Date;
}
