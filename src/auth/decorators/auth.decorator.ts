import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuard } from '../guards/user-role/user-role.guard';
import { EValidRoles } from '../interfaces/valid-roles.interface';
import { RoleProtected } from './index.decorator';

export function Auth(...roles: EValidRoles[]) {
	return applyDecorators(RoleProtected(...roles), UseGuards(AuthGuard(), UserRoleGuard));
}
