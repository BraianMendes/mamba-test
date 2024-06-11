import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

export enum Status {
  ATIVA = 'ativa',
  PAUSADA = 'pausada',
  EXPIRADA = 'expirada',
}

@Entity()
export class Campanha {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @CreateDateColumn()
  dataCadastro: Date;

  @Column()
  dataInicio: Date;

  @Column()
  dataFim: Date;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.ATIVA,
  })
  status: Status;

  @Column()
  categoria: string;

  @Column({ default: false })
  isDeleted: boolean;
}
