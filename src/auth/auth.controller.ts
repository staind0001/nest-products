import { Controller, Get, Post, Body, UseGuards, Req, SetMetadata, Headers } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IncomingHttpHeaders } from 'http';
import { AuthService } from './auth.service';
import { Auth, GetRawHeaders,GetUser, RoleProtected } from './decorators';
import { CreateUserDto,LoginUserDto} from './dto';
import { User } from './entities/user.entity';
import { UserRoleGuard } from './guards/user-role.guard';
import { validRoles } from './interfaces';
import {ApiTags} from '@nestjs/swagger'


@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  LoginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('check-status')
  @Auth()
  checkAuthStatus(
    @GetUser() user:User,
  ){
    return this.authService.checkAuthStatus(user);
  }



  @Get('private')
  @UseGuards(AuthGuard())
  testingPrivateRoute(
    @Req() request:Express.Request,
    @GetUser() user:User,
    @GetUser('email') userEmail:string,
    @GetRawHeaders() rawHeaders:string[],
    @Headers() headers: IncomingHttpHeaders
  ){

     return {
      ok:true,
      message:'Hello World-privateRoute',
      user,
      userEmail,
      rawHeaders,
      headers,
     }
  }



// @SetMetadata('roles', ['admin','super-user'])
  @Get('private2')
  @RoleProtected(validRoles.superUser,validRoles.admin,validRoles.user)
  @UseGuards(AuthGuard(), UserRoleGuard )
  privateRoute(
    @GetUser() user:User,
  ){
     return {
      ok:true,
      message:'Hello World-privateRoute2',
      user,
     }
  }


  @Get('private3')
  @Auth(validRoles.admin)
  privateRoute3(
    @GetUser() user:User,
  ){
    return {
      ok:true,
      user
    }
  }
}
