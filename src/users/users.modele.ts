import { Column, DataType, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";

interface IUserCreationsAttr {
  name: string
  email: string
  password: string
  companyId?: number
}

@Table({ tableName: "users" })
export class User extends Model<User, IUserCreationsAttr> {
  @ApiProperty({example: "1", description: "Уникальный id пользователя.ю присваивается автоматически"})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;
  @ApiProperty({example: "Иван", description: "Имя пользоватля"})
  @Column({type: DataType.STRING, allowNull: false})
  name: string;
  @ApiProperty({example: "tz@mail.ru", description: "Email пользователя"})
  @Column({type: DataType.STRING, unique: true, allowNull: false})
  email: string;
  @ApiProperty({example: "123456", description: "Пароль пользователя"})
  @Column({type: DataType.STRING, allowNull: false})
  password: string;
  @ApiProperty({example: "2", description: "id компании пользователя"})
  @Column({type: DataType.INTEGER,allowNull: true, defaultValue: 0})
  companyId: number;
}