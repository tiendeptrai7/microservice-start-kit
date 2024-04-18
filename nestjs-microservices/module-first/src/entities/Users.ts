import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users", { schema: "TienPT" })
export class Users {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "email", nullable: true, length: 255 })
  email: string | null;

  @Column("varchar", { name: "password", nullable: true, length: 1000 })
  password: string | null;

  @Column("varchar", { name: "user_name", nullable: true, length: 255 })
  userName: string | null;

  @Column("date", { name: "birthday", nullable: true })
  birthday: string | null;

  @Column("tinyint", { name: "gender" })
  gender: number;

  @Column("tinyint", { name: "status", default: () => "'1'" })
  status: number;

  @Column("int", { name: "role_id" })
  roleId: number;

  @Column("timestamp", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @Column("timestamp", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @Column("timestamp", { name: "deleted_at", nullable: true })
  deletedAt: Date | null;
}
