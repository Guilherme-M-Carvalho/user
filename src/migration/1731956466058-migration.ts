import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1731956466058 implements MigrationInterface {
    name = 'Migration1731956466058'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cad_user" ADD "teste" character varying(500) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cad_user" DROP COLUMN "teste"`);
    }

}
