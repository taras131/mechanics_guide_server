import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "../users/users.modele";
import { UserRoles } from "./user-roles.modele";

interface IRoleCreationsAttr {
  value: string
  description: string
}

@Table({ tableName: "roles" })
export class Role extends Model<Role, IRoleCreationsAttr> {
  @ApiProperty({example: "1", description: "Уникальный id роли пользователя присваивается автоматически"})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @ApiProperty({example: "Механик", description: "Наименование роли"})
  @Column({type: DataType.STRING, unique: true, allowNull: false})
  value: string;

  @ApiProperty({example: "Человек не отвечающий не за что", description: "Описание сути роли пользователя"})
  @Column({type: DataType.STRING, unique: true, allowNull: false})
  description: string;

  @BelongsToMany(()=> User, ()=> UserRoles)
  users: User[]
}