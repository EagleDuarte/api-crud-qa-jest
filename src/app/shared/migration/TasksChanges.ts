import { MigrationInterface, QueryRunner } from "typeorm";

export class TasksChanges implements MigrationInterface {
  name = "TasksChanges";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Tasks"."tasks" ALTER COLUMN "arquivada" SET DEFAULT '0'`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Tasks"."tasks" ALTER COLUMN "arquivada" SET DEFAULT false`
    );
  }
}
