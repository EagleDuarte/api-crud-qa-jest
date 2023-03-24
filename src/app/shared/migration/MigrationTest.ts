import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationTest implements MigrationInterface {
    name = 'MigrationTest'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Tasks"."tasks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" character varying(60), "detail" character varying(60), "arquivada" boolean DEFAULT '0', "id_user" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Tasks"."users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(60), "pass" character varying(10), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Tasks"."tasks" ADD CONSTRAINT "" FOREIGN KEY ("id_user") REFERENCES "Tasks"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Tasks"."tasks" DROP CONSTRAINT ""`);
        await queryRunner.query(`DROP TABLE "Tasks"."users"`);
        await queryRunner.query(`DROP TABLE "Tasks"."tasks"`);
    }

}
