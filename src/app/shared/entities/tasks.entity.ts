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
