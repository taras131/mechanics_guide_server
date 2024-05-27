import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./users.modele";
import { Role } from "../roles/roles.modele";
import { UserRoles } from "../roles/user-roles.modele";
import { RolesModule } from "../roles/roles.module";

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [
    SequelizeModule.forFeature([User, Role, UserRoles]),
    RolesModule
  ]
})
export class UsersModule {}
