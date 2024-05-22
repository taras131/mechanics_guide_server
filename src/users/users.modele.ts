import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IUserCreationsAttr {
  name: string
  email: string
  password: string
  companyId?: number
}

@Table({ tableName: "users" })
export class User extends Model<User, IUserCreationsAttr> {
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;
  @Column({type: DataType.STRING, allowNull: false})
  name: string;
  @Column({type: DataType.STRING, unique: true, allowNull: false})
  email: string;
  @Column({type: DataType.STRING, allowNull: false})
  password: string;
  @Column({type: DataType.INTEGER,allowNull: true, defaultValue: 0})
  companyId: number;
}