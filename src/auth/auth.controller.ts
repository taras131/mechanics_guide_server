import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { AuthService } from "./auth.service";

@ApiTags("Авторизация")
@Controller('/auth')
export class AuthController {

  constructor(private authService: AuthService) {
  }

  @Post("/login")
  login (@Body() userDto: CreateUserDto) {
    return this.authService.login(userDto)
  }

  @Post("/registration")
  registration (@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto)
  }

  @Get("/check")
  checkAuth(@Req() request: Request) {
    const token = request.query.token as string;
    return this.authService.checkAuth(token)
  }

}
