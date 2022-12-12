import { Body, Controller, Get, Post } from "@nestjs/common";
import * as nodemailer from "nodemailer";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {

  //password: string = "";

  constructor(private readonly authService: AuthService) {}
    
  @Get("otp")
  generatePassword(): string {
    return this.authService.createPassword()
  }

  @Post("send/otp")
  async sendPassword(@Body("email") email: string): Promise<void> {
    this.authService.sendOtpByEmail(email)
  }

  @Post("validate/otp")
  validatePassword(@Body("otp") password: string) {   
    this.authService.validateTimePassword(password)
  }
}
