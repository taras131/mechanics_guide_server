import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "../users/users.modele";
import { Role } from "./roles.modele";

@Table({ tableName: "user roles" , createdAt: false, updatedAt: false})
export class UserRoles extends Model<UserRoles> {
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @ForeignKey(()=> Role)
  @Column({type: DataType.INTEGER})
  roleId: number;

  @ForeignKey(()=> User)
  @Column({type: DataType.INTEGER})
  userId: number;


}