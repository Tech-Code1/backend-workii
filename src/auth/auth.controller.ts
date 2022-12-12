import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import * as nodemailer from "nodemailer";
import { AuthService } from "./auth.service";

@ApiTags('auth')
@Controller("auth")
export class AuthController {

  email: string = "";

  constructor(private readonly authService: AuthService) {}
    
  @Get("otp")
  generatePassword(): string {
    return this.authService.createOtp()
  }

  @Post("send/otp")
  async sendPassword(@Body("email") email: string): Promise<void> {
    this.email = email;
    this.authService.sendOtpByEmail(email)
  }

  @Post("validate/otp")
  validatePassword(@Body("otp") otp: string) {   
    this.authService.validateTimePassword(otp)
  }

  @Post("register")
  async register(@Body("email") email: string) {
    this.email = email;
    
  }
}
