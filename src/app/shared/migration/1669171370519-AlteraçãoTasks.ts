import { MigrationInterface, QueryRunner } from "typeorm";

export class AlteraçãoTasks1669171370519 implements MigrationInterface {
  name = "AlteraçãoTasks1669171370519";

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
