import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateNewToTest implements MigrationInterface {
    name = 'CreateNewToTest'

    public async up(queryRunner: QueryRunner): Promise<void> {
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }
}
