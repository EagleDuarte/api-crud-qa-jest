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
