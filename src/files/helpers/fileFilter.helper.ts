export const fileFilter = (req: Express.Request, file: Express.Multer.File, callback: Function) => {
	//console.log(file);

	if (!file) return callback(new Error('File is empty'), false);

	const fileExpression = file.mimetype.split('/')[1];
	const validExtenssions = ['jpg', 'png', 'svg', 'gif', 'tif', 'jpeg'];

	if (validExtenssions.includes(fileExpression)) {
		return callback(null, true);
	}

	callback(null, false);
};
