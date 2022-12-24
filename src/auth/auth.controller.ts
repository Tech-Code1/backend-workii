import { Body, Controller, Get, Post, Req, SetMetadata, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiTags } from "@nestjs/swagger";
import { IncomingHttpHeaders } from "http";
import { LoginUserDto } from "src/auth/DTOs/login-user.dto";
import { RawHeaders } from "src/common/decorators/raw-headers.decorators";
import { User } from "src/users/users.entity";
import { AuthService } from "./auth.service";
import { Auth } from "./decorators/auth.decorator";
import { GetUser } from "./decorators/get-user.decorator";
import { RoleProtected } from "./decorators/role-protected.decorator";
import { UserRoleGuard } from "./guards/user-role/user-role.guard";
import { EValidRoles } from "./interfaces/valid-roles.interface";

@ApiTags('auth')
@Controller("auth")
export class AuthController {

  constructor(private readonly authService: AuthService) {}
    
  @Get("otp")
  generatePassword(): string {
    return this.authService.createOtp()
  }

  @Post("validate/otp")
  validatePassword(@Body("otp") otp: string) {   
    this.authService.validateTimePassword(otp)
  }

  @Post("login")
    async loginUser(@Body() loginUserDto: LoginUserDto): Promise<User| null> {
    
      return await this.authService.login(loginUserDto)
  }

  @Get('check-status')
  @Auth()
  checkAuthStatus(
    @GetUser() user: User
  ) {

    return this.authService.checkAuthStatus(user)
  }

  @Get('private')
  @UseGuards( AuthGuard() )
  testingPrivateRoute( 
  @GetUser( ['email', 'nick', 'roles', 'isActive'] ) user: User,
  @RawHeaders() rawHeaders: string
  ) 
  {

  return {
    ok: true,
    user,
    rawHeaders
  }
  }
  //@SetMetadata('roles', ['admin', 'super-user'])
  
  @Get('private2')
  @RoleProtected( EValidRoles.superuser, EValidRoles.admin, EValidRoles.user )
  @UseGuards( AuthGuard(), UserRoleGuard)
  privateRoute2 (
    @GetUser() user: User
  ) {

    return {
      ok: true,
      user
    }
  }

  @Get('private3')
  @Auth(EValidRoles.admin)
  privateRoute3 (
    @GetUser() user: User
  ) {

    return {
      ok: true,
      user
    }
  }

}


