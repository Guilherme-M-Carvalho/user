import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1729638348076 implements MigrationInterface {
    name = 'Migrations1729638348076'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying(500) NOT NULL, "email" character varying(500) NOT NULL, "password" character varying(500) NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
