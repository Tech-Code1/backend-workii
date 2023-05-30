import { User } from '@db/entities';
import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { META_ROLES } from '../../decorators/role-protected.decorator';

@Injectable()
export class UserRoleGuard implements CanActivate {
	constructor(private readonly reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		const validRoles: string[] = this.reflector.get(META_ROLES, context.getHandler());

		if (!validRoles || validRoles.length === 0) return true;

		const req = context.switchToHttp().getRequest();
		const user = req.user as User;

		if (!user) {
			throw new BadRequestException('Usuario no encontrado');
		}

		for (const role of user.roles) {
			if (validRoles.includes(role)) {
				return true;
			}
		}

		console.log({ userRoles: user.roles });

		throw new ForbiddenException(`El usuario ${user.nick} necesita tener un rol valido para acceder a esta instancia`);
	}
}
