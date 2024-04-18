import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1713439071281 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `create table users (
              id INT auto_increment not null,
              email varchar(255) default null,
              password varchar(1000) default null,
              user_name varchar(255) default null,
              birthday DATE default null,
              gender TINYINT not null,
              status TINYINT not null default 1,
              role_id INT not null,
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              updated_at TIMESTAMP DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
              deleted_at TIMESTAMP DEFAULT NULL,
              PRIMARY KEY (id)
            )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`drop table users`);
  }
}
