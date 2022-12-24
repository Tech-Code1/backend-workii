import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiTags } from "@nestjs/swagger";
import { LoginUserDto } from "src/auth/DTOs/login-user.dto";
import { User } from "src/users/users.entity";
import { AuthService } from "./auth.service";

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

  @Get('private')
  @UseGuards( AuthGuard() )
  testingPrivateRoute() {
    return {
      ok: true,
      message: 'Hola Mundo Private'
    }
  }
  
}
