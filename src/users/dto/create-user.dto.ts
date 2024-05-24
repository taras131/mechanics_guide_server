import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({example: "Иван", description: "Имя пользоватля"})
  readonly name: string
  @ApiProperty({example: "tz@mail.ru", description: "Email пользователя"})
  readonly email: string
  @ApiProperty({example: "123456", description: "Пароль пользователя"})
  readonly password: string
  @ApiProperty({example: "2", description: "id компании пользователя"})
  readonly companyId?: number
}