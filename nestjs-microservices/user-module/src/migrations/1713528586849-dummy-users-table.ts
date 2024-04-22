import { MigrationInterface, QueryRunner } from 'typeorm';

export class DummyUsersTable1713528586849 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO users (email, password, user_name, birthday, gender, status, role_id, created_at, updated_at, deleted_at)
            VALUES
                ('user1@example.com', 'password1', 'User 1', '1990-01-01', 1, 1, 1, CURRENT_TIMESTAMP, NULL, NULL),
                ('user2@example.com', 'password2', 'User 2', '1990-02-02', 0, 1, 2, CURRENT_TIMESTAMP, NULL, NULL),
                ('user3@example.com', 'password3', 'User 3', '1990-03-03', 1, 1, 1, CURRENT_TIMESTAMP, NULL, NULL),
                ('user4@example.com', 'password4', 'User 4', '1990-04-04', 0, 1, 2, CURRENT_TIMESTAMP, NULL, NULL),
                ('user5@example.com', 'password5', 'User 5', '1990-05-05', 1, 1, 1, CURRENT_TIMESTAMP, NULL, NULL),
                ('user6@example.com', 'password6', 'User 6', '1990-06-06', 0, 1, 2, CURRENT_TIMESTAMP, NULL, NULL),
                ('user7@example.com', 'password7', 'User 7', '1990-07-07', 1, 1, 1, CURRENT_TIMESTAMP, NULL, NULL),
                ('user8@example.com', 'password8', 'User 8', '1990-08-08', 0, 1, 2, CURRENT_TIMESTAMP, NULL, NULL),
                ('user9@example.com', 'password9', 'User 9', '1990-09-09', 1, 1, 1, CURRENT_TIMESTAMP, NULL, NULL),
                ('user10@example.com', 'password10', 'User 10', '1990-10-10', 0, 1, 2, CURRENT_TIMESTAMP, NULL, NULL);`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
