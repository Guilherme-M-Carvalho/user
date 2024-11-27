import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1731956425410 implements MigrationInterface {
    name = 'Migration1731956425410'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cad_user" ("id" SERIAL NOT NULL, "name" character varying(500) NOT NULL, "email" character varying(500) NOT NULL, "password" character varying(500) NOT NULL, CONSTRAINT "PK_8c9ad4b922c334f57678b1e6815" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "cad_user"`);
    }

}
