import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
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
      roles: user.roles
    };
    return { token: this.jwtService.sign(payload) };
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.usersService.getUserByEmail(userDto.email);
    const passWordEquals = await bcrypt.compare(userDto.password, user.password);
    if (user && passWordEquals) {
      return user;
    }
    throw new UnauthorizedException({message: 'Некорректный email или пароль'});
  }

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    return await this.generateToken(user);
  }

  async registration(userDto: CreateUserDto) {
    const candidate = this.usersService.getUserByEmail(userDto.email);
    if (candidate) {
      throw new HttpException("пользователь с таким email уже существует", HttpStatus.BAD_REQUEST);
    }
    const hashPassword = await bcrypt.hash(userDto.password, 3);
    const user = await this.usersService.createUser({ ...userDto, password: hashPassword });
    return await this.generateToken(user);
  }

}
