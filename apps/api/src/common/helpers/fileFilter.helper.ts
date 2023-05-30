import { Multer } from 'express/node_modules/ms';

export const fileFilter = (req: Express.Request, file: Multer.File, callback: Function) => {
	//console.log(file);

	if (!file) return callback(new Error('File is empty'), false);

	const fileExpression = file.mimetype.split('/')[1];
	const validExtenssions = ['jpg', 'png', 'svg', 'gif', 'tif', 'jpeg'];

	if (validExtenssions.includes(fileExpression)) {
		return callback(null, true);
	}

	// Proporciona un mensaje de error específico para archivos con extensiones no válidas
	callback(new Error('Invalid file type. Only jpg, png, svg, gif, tif, and jpeg are allowed.'), false);
};
