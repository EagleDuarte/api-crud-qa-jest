import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { UserEntity } from "./user.entity";

@Entity({
  name: "tasks",
})
export class TasksEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  // @PrimaryColumn({
  //   length: 60,
  // })
  // id!: string;

  @Column({
    nullable: true,
    length: 60,
  })
  description!: string;

  @Column({
    nullable: true,
    length: 60,
  })
  detail!: string;

  @Column({
    // nullable: true,
    // type: "boolean",
    default: 0,
  })
  arquivada!: boolean;

  @ManyToOne(() => UserEntity)
  @JoinColumn({
    name: "id_user",
  })
  user!: UserEntity;

  @Column({
    name: "id_user",
  })
  id_user!: string;

  @CreateDateColumn({
    name: "created_at",
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: "updated_at",
  })
  updatedAt!: Date;
}

/* Este código define uma entidade de tarefa (TasksEntity) para um banco de dados usando TypeORM, que é um ORM (Object-Relational Mapping) para TypeScript e JavaScript.
A entidade possui os seguintes campos: id (um identificador gerado automaticamente), descrição, detalhe, arquivada (uma flag booleana), usuário (um relacionamento
muitos-para-um com a entidade UserEntity) e created_at e updated_at (datas de criação e atualização da tarefa, respectivamente). O código também define o nome da tabela no
banco de dados ("tasks").  */