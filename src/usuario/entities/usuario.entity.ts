import { hashSync } from 'bcrypt';
import { win32 } from 'node:path/posix';
import { Endereco } from 'src/endereco/entities/endereco.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  TableInheritance,
} from 'typeorm';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  nome: string;

  @Column()
  telefone: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  senha?: string;

  @ManyToMany(() => Endereco, {
    cascade: true,
    orphanedRowAction: 'delete',
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinTable({ name: 'usuario_tem_endereco' })
  enderecos?: Endereco[];

  @BeforeInsert()
  hashPassword() {
    this.senha = hashSync(this.senha, 10);
  }
}

//request.user(instanceOf.type(instrutor, admin, cliente....))
