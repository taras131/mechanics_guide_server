import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType } from "sequelize-typescript";

export class CreateRoleDto {
  @ApiProperty({example: "Механик", description: "Наименование роли"})
  @Column({type: DataType.STRING, unique: true, allowNull: false})
  readonly value: string

  @ApiProperty({example: "Человек не отвечающий не за что", description: "Описание сути роли пользователя"})
  @Column({type: DataType.STRING, unique: true, allowNull: false})
  readonly description: string

}