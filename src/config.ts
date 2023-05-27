import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
	return {
		NODEMAILER_USER: process.env.NODEMAILER_USER,
		PASS_GMAIL: process.env.PASS_GMAIL
	};
});
