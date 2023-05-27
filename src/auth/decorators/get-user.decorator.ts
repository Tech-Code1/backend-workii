import { createParamDecorator, ExecutionContext, InternalServerErrorException } from '@nestjs/common';

export const GetUser = createParamDecorator((data, ctx: ExecutionContext) => {
	const req = ctx.switchToHttp().getRequest();
	const user = req.user;
	const filteredUser: any = {};

	if (!user) throw new InternalServerErrorException('El usuario no se encuentra (request)');

	if (data) {
		for (const key of data) {
			if (key in user) {
				filteredUser[key] = user[key];
			}
		}
	}

	return !data ? user : filteredUser;
});
