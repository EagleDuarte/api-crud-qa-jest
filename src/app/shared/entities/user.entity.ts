import {
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TasksEntity } from "./tasks.entity";

@Entity({
  name: "users",
})
export class UserEntity {
  @PrimaryGeneratedColumn("uuid") id!: string;

  // @PrimaryColumn({
  //   length: 60,
  // })
  // id!: string;

  @Column({
    length: 60,
    nullable: true,
    unique: true,
  })
  name!: string;

  @Column({
    length: 10,
    nullable: true,
  })
  pass!: string;

  @CreateDateColumn({
    name: "created_at",
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: "updated_at",
  })
  updatedAt!: Date;

  @OneToMany(() => TasksEntity, (tasks) => tasks.user)
  tasks!: TasksEntity[];
}

/* Este código define uma entidade chamada UserEntity que representa um usuário no banco de dados e é definida usando a biblioteca TypeORM. A entidade tem uma coluna de ID que é gerada automaticamente e uma coluna de nome que é única e não pode ser nula.
Ele também tem uma coluna de senha e colunas de data de criação e atualização.
A entidade também tem um relacionamento de um-para-muitos com a entidade TasksEntity, que representa as tarefas associadas a um usuário. Essa relação é definida usando a 
anotação @OneToMany. A entidade TasksEntity tem uma chave estrangeira id_user que se refere ao ID do usuário a que a tarefa está associada  */