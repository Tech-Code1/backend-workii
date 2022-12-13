import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { loginUserDto } from "./DTOs/login.dto";

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
  loginUser(@Body() userLogin: loginUserDto) {
    return this.authService.login(userLogin)
  }
}
