import { HttpException, HttpStatus, Injectable, Query, UnauthorizedException } from "@nestjs/common";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { User } from "../users/users.modele";

@Injectable()
export class AuthService {

  constructor(private usersService: UsersService,
              private jwtService: JwtService) {
  }

  private async generateToken(user: User) {
    const payload = {
      email: user.email,
      id: user.id,
      roles: user.roles,
      name: user.name
    };
    return { token: this.jwtService.sign(payload) };
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.usersService.getUserByEmail(userDto.email);
    const passWordEquals = await bcrypt.compare(userDto.password, user.password);
    if (user && passWordEquals) {
      return user;
    }
    throw new UnauthorizedException({ message: "Некорректный email или пароль" });
  }

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    if(user) {
      return await this.generateToken(user);
    }

  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.usersService.getUserByEmail(userDto.email);
    if (candidate) {
      throw new HttpException("пользователь с таким email уже существует", HttpStatus.BAD_REQUEST);
    }
    const hashPassword = await bcrypt.hash(userDto.password, 3);
    const user = await this.usersService.createUser({ ...userDto, password: hashPassword });
    return await this.generateToken(user);
  }

  async checkAuth(token: string) {
    if (token) {
      const user = await this.jwtService.verify(token);
      return await this.generateToken(user);
    } else {
      throw new UnauthorizedException({ message: "Токен не найден" });
    }
  }
}
