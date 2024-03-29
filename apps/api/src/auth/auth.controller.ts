import { User } from '@db/entities';
import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { LoginUserDto } from '../auth/DTOs/login-user.dto';
import { RawHeaders } from '../common/decorators/raw-headers.decorators';
import { AuthService } from './auth.service';
import { Auth } from './decorators/auth.decorator';
import { GetUser } from './decorators/get-user.decorator';
import { RoleProtected } from './decorators/role-protected.decorator';
import { UserRoleGuard } from './guards/user-role/user-role.guard';
import { EValidRoles } from './interfaces/valid-roles.interface';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Get('otp')
	generatePassword(): string {
		return this.authService.createOtp();
	}

	@Post('validate/otp')
	validatePassword(@Body('otp') otp: string, @Res() res: Response) {
		this.authService.validateTimePassword(otp, res);
	}

	@Post('login')
	async loginUser(@Body() loginUserDto: LoginUserDto): Promise<User | null> {
		return await this.authService.login(loginUserDto);
	}

	/* @Get('revalidate')
  async refresh(@Req() req: Request, @Res() res: Response) {
    return await this.authService.revalidateToken(req, res);
  } */

	@Post('refresh-token')
	async refreshToken(@Body('refreshToken') refreshToken: string) {
		return this.authService.refreshToken(refreshToken);
	}

	@Get('check-status')
	@Auth()
	checkAuthStatus(@GetUser() user: User) {
		return this.authService.checkAuthStatus(user);
	}

	@Get('private')
	@UseGuards(AuthGuard())
	testingPrivateRoute(@GetUser(['email', 'nick', 'roles', 'isActive']) user: User, @RawHeaders() rawHeaders: string) {
		return {
			ok: true,
			user,
			rawHeaders
		};
	}
	//@SetMetadata('roles', ['admin', 'super-user'])

	@Get('private2')
	@RoleProtected(EValidRoles.superuser, EValidRoles.admin, EValidRoles.user)
	@UseGuards(AuthGuard(), UserRoleGuard)
	privateRoute2(@GetUser() user: User) {
		return {
			ok: true,
			user
		};
	}

	@Get('private3')
	@Auth(EValidRoles.admin)
	privateRoute3(@GetUser() user: User) {
		return {
			ok: true,
			user
		};
	}
}
